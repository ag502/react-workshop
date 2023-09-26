import { Link } from 'react-router-dom'
import { api } from 'react/_full-app/utils/api'
import { Heading } from 'react2/_full-app/src/Heading'
import { DataGrid, Row, Col } from '~/DataGrid'
import { Loading } from '~/Loading'
import { NoResults } from '~/NoResults'
import { useCourses } from './courseData'

export function BrowseCourses() {
  const [courses, setCourses] = useCourses()
  const isLoading = courses === null

  function removeCourse(courseId: number) {
    if (!courses) return
    api.courses.removeCourse(courseId).then(() => {
      const i = courses?.findIndex((c) => c.id === courseId)
      setCourses([...courses.slice(0, i), ...courses.slice(i + 1, courses.length)])
    })
  }

  return (
    <div className="card spacing">
      <Heading>Courses</Heading>

      {isLoading && !courses && <Loading />}
      {!isLoading && Array.isArray(courses) && courses.length === 0 ? (
        <NoResults>
          <div className="spacing">
            <p>No Courses</p>
            <Link to="add" className="button">
              Add Course
            </Link>
          </div>
        </NoResults>
      ) : (
        <>
          <DataGrid>
            {courses?.map((course) => {
              return (
                <Row key={course.id}>
                  <Col flex>
                    <Link to={`${course.slug}`} className="text-large">
                      <b>{course.name}</b>
                    </Link>
                  </Col>
                  <Col width={150}>Lessons: {course.lessons.length}</Col>
                  <Col>
                    <button
                      className="button button-small button-outline"
                      onClick={() => removeCourse(course.id)}
                    >
                      Remove
                    </button>
                  </Col>
                </Row>
              )
            })}
          </DataGrid>
          <footer>
            <Link to="add" className="button">
              Add Course
            </Link>
          </footer>
        </>
      )}
    </div>
  )
}