import '../css/workload.css'
import '../css/commonStyles.css'
import BarChart from './BarChart';

export default function WorkloadPerformance({data}) {
  return (
    <>
      <div className="workload content-container">
        <div className="work-header content-header">
          <div className="work-text header-text">
            <h3>Workload Performance</h3>
            <small>Real time status distribution analysis</small>
          </div>
          <div className="work-legend">
            <small className="pending">
              <span>●</span> PENDING
            </small>
            <small className="in-progress">
              <span>●</span> IN PROGRESS
            </small>
            <small className="completed">
              <span>●</span> COMPLETED
            </small>
          </div>
        </div>
          <div className='graph-container'>
            <BarChart data={data}/>
          </div>
      </div>
    </>
  );
}
