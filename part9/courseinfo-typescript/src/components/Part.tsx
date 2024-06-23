import { CoursePart } from '../App';

const Part = (props: CoursePart) => {
  const bottomMargin = {
    marginBottom: 10,
  };

  switch (props.kind) {
    case 'basic':
      return (
        <div style={bottomMargin}>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <br />
          <i>{props.description}</i>
        </div>
      );
    case 'group':
      return (
        <div style={bottomMargin}>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <br />
          project exercises {props.groupProjectCount}
        </div>
      );
    case 'background':
      return (
        <div style={bottomMargin}>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <br />
          <i>{props.description}</i>
          <br />
          {props.backgroundMaterial}
        </div>
      );
    case 'special':
      return (
        <div style={bottomMargin}>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <br />
          {props.description}
          <br />
          required skills: {props.requirements.join(', ')}
        </div>
      );
  }
};

export default Part;
