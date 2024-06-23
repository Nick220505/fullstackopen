import { CoursePart } from '../App';
import Part from './Part';

const Content = (props: CoursePart[]) => {
  return (
    <>
      {Object.values(props).map((p) => (
        <Part key={p.name} {...p} />
      ))}
    </>
  );
};

export default Content;
