import FailureIssueCard from '../../UI/card/FailureIssueCard'
import ViewMore from '../../UI/card/ViewMore'

const RenderCard = ({data}: any) => {
  return (
    <ViewMore view_more_link={data.view_more_link}>
        <FailureIssueCard 
          name={data.name} 
          number={data.chart.number} 
          id={data.id} 
          percent={data.chart.percent} 
          timeLabel={data?.chart?.aggregate_health?.time_frame['type']}
        />
      </ViewMore>  
  )
}

export default RenderCard