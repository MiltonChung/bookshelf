import {client} from './api-client'
import {useQuery, useMutation, queryCache} from 'react-query'
import {setQueryKeyDataForBook} from './books'

const useListItems = user => {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
    config: {
      onSuccess(listItems) {
        listItems.forEach(item => {
          setQueryKeyDataForBook(item.book)
        })
      },
    },
  })

  return listItems ?? []
}

const useListItem = (bookId, user) => {
  const listItems = useListItems(user)
  return listItems?.find(listItem => listItem.bookId === bookId) ?? null
}

const defaultMutationConfig = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
  onError(error, variables, rollback) {
    if (typeof rollback === 'function') {
      rollback()
    }
  },
}

const useUpdateListItem = (user, options) => {
  return useMutation(
    data =>
      client(`list-items/${data.id}`, {
        method: 'PUT',
        token: user.token,
        data,
      }),
    {
      onMutate(newItem) {
        const previousItems = queryCache.getQueryData('list-items')
        queryCache.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })
        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationConfig,
      ...options,
    },
  )
}

const useRemoveListItem = (user, options) => {
  return useMutation(
    ({listItemId}) =>
      client(`list-items/${listItemId}`, {
        method: 'DELETE',
        token: user.token,
      }),
    {
      onMutate(removedItem) {
        const previousItems = queryCache.getQueryData('list-items')
        queryCache.setQueryData('list-items', old => {
          return old.filter(item => item.id !== removedItem.id)
        })
        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationConfig,
      ...options,
    },
  )
}

const useCreateListItem = (user, options) => {
  return useMutation(
    ({bookId}) => client('list-items', {data: {bookId}, token: user.token}),
    {...defaultMutationConfig, ...options},
  )
}

export {
  useListItems,
  useListItem,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
