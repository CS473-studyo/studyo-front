import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../../components/header'
import CourseHeader from '../../../components/courseHeader'

const Course = () => {
  const router = useRouter()
  const { courseid } = router.query

  return (
    <>
      <Header />
      <CourseHeader courseid={courseid} />
    </>
  )
}

export default Course
