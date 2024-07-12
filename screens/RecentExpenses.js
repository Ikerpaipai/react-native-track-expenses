import { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDay } from '../utils/date'
import { fetchExpenses } from '../utils/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const { expenses, setExpenses } = useContext(ExpensesContext)

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const expensesData = await fetchExpenses()
        setExpenses(expensesData)
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false)
    }

    getExpenses()
  }, [])

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDay(today, 7)

    return expense.date > date7DaysAgo && expense.date <= today
  })

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses register for the last 7 days."
    />
  )
}

export default RecentExpenses
