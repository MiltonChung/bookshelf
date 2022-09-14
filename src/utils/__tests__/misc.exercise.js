import {formatDate} from '../misc'

test('formatDate formats the date to look nice', () => {
  const date = new Date('September 13, 2022')
  expect(formatDate(date)).toBe('Sep 22')
})
