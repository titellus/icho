import styles from './metadata-time-line.module.scss';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Icon} from 'semantic-ui-react'
import React from "react";

interface Props {
  timeValue: any;
}

export function MetadataTimeLine({timeValue}: Props) {
  if (timeValue === '') {
    return null;
  }
  timeValue.sort(function (a:any, b:any) {
    return Date.parse(a.date) - Date.parse(b.date);
  })
  return (
    <div className={styles.timeline}>
      <VerticalTimeline
        layout={'1-column'}>
        {timeValue.map((element: any) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work react-vertical-timeline "
            contentStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
            contentArrowStyle={{borderRight: '7px solid  rgb(33, 150, 243)'}}
            date={element.date}
            iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff',display:"flex",alignItems:"center",justifyContent:"center"}}
            icon={<Icon name='calendar times outline' className={styles.timelineIcon}/>}
          >
            <h4 className="vertical-timeline-element-title">{element.type}</h4>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default MetadataTimeLine;
