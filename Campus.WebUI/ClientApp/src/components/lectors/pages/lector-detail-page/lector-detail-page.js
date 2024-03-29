import React, { Component } from 'react';
import LectorDetail from '../../components/lector-detail';
import Spinner from '../../../spinner/';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import LectorsSubjectsList from '../../../lector-subjects/components/lectors-subjects-list';
import LectorsLessonsList from '../../../lessons/components/lectors-lessons-list';
import DetailActions from '../../../common/detail-actions';
import CreateNewLink from '../../../common/create-new-link';
import withCampusService from '../../../hoc/with-campus-service';
import Modal from '../../../common/modal';
import RangeAttendance from '../../../attendances/components/range-attendance';

class LectorDetailPage extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onLessonDelete = this.onLessonDelete.bind(this);
    this.onSubjectDelete = this.onSubjectDelete.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    activeTab: '1',
    lectorsSubjects: [],
    lessons: [],
    attendanceData: [],
    lector: null,
    hasError: false,
    error: null,
    header: '',
    loading: true
  };

  componentDidMount() {
    this.fetchLector();
  }

  toggleTab(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  onDelete() {
    const id = this.state.lector.id;
    this.props.campusService.deleteLector(id)
      .then(() => this.props.history.push('/lectors'))
      .catch(err => this.showLectorDeleteErrorModal(err));
  }

  onSubjectDelete(id) {
    this.props.campusService.deleteLectorSubject(id)
      .then(() => this.removeSubjectFromList(id))
      .catch(err => this.showLectorSubjectDeleteErrorModal(err));
  }

  onLessonDelete(id) {
    this.props.campusService.deleteLesson(id)
      .then(() => this.removeLessonFromList(id))
      .catch(err => this.showLessonDeleteErrorModal(err));
  }

  showLectorDeleteErrorModal(err) {
    const header = 'An error has occured while deleting lector';
    this.showModal(err, header);
  }

  showLectorSubjectDeleteErrorModal(err) {
    const header = 'An error has occured while deleting assigned subject';
    this.showModal(err, header);
  }

  showLessonDeleteErrorModal(err) {
    const header = 'An error has occured while deleting lesson';
    this.showModal(err, header);
  }

  showModal(err, header) {
    this.setState({
      hasError: true,
      error: err,
      header: header
    })
  }

  removeSubjectFromList(id) {
    this.setState({
      lectorsSubjects: this.state.lectorsSubjects.filter(function (lectorSubject) {
        return lectorSubject.id !== id
      })
    });
  }

  removeLessonFromList(id) {
    this.setState({
      lessons: this.state.lessons.filter(function (lesson) {
        return lesson.id !== id
      })
    });
  }

  toggle() {
    this.setState({
      hasError: !this.state.hasError
    });
  }

  fetchLector() {
    const { id } = this.props.match.params;
    const { campusService } = this.props;
    Promise.all([
      campusService.getLector(id),
      campusService.getLectorsSubjects(id),
      campusService.getLectorsLessons(id)
    ]).then(([lector, { lectorsSubjects }, { lessons }]) => {
      this.setState({
        lector: lector,
        lectorsSubjects: lectorsSubjects,
        lessons: lessons,
        loading: false
      })
    })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  }

  loadAttendanceData = (startDate, endDate) => {
    const { lector } = this.state;

    this.props.campusService.getLectorsAttendances(lector.id, startDate, endDate)
      .then(({ data }) => {
        this.setState({
          attendanceData: data
        })
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  }

  render() {
    const { lector, lectorsSubjects, lessons, loading, activeTab, error, hasError, header, attendanceData } = this.state;
    if (hasError && error.status !== 409) {
      throw error;
    }

    return (<Row>
      <Col xs={12}>
        {loading ? <Spinner /> :
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}>
                  General
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { this.toggleTab('2'); }}>
                  Subjects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { this.toggleTab('3'); }}>
                  Lessons
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => { this.toggleTab('4'); }}>
                  Attendance
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                {activeTab == 1 ?
                  <React.Fragment>
                    <DetailActions toEdit={`/lectors/edit/${lector.id}`} onDelete={this.onDelete} />
                    <LectorDetail lector={lector} />
                  </React.Fragment>
                  : null}
              </TabPane>
              <TabPane tabId="2">
                {activeTab == 2 ?
                  <React.Fragment>
                    <CreateNewLink to={`/lectorsubject/new/${lector.id}`} />
                    <LectorsSubjectsList lectorsSubjects={lectorsSubjects} onDelete={this.onSubjectDelete} />
                  </React.Fragment>
                  : null}
              </TabPane>
              <TabPane tabId="3">
                {activeTab == 3 ?
                  <React.Fragment>
                    <CreateNewLink to={`/lessons/new`} />
                    <LectorsLessonsList lessons={lessons} onDelete={this.onLessonDelete} />
                  </React.Fragment> : null}
              </TabPane>
              <TabPane tabId="4">
                {activeTab == 4 ? <RangeAttendance loadData={this.loadAttendanceData} data={attendanceData} />
                  : null}
              </TabPane>
            </TabContent>
          </div>}
        {hasError ?
          <Modal header={header} body={error.error}
            modal={hasError} toggle={this.toggle} /> : null}
      </Col>
    </Row>)
  }
}

export default withCampusService(LectorDetailPage);