import Courses from './Courses';

const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {
	return (
		<p>
			<strong> Number of exercises {
			parts.reduce((total, part) => total + part.exercises, 0)
			}</strong>
		</p>
	)
}

const Part = ({ name, exercises }) => {
	return (
	<p>
		{name} {exercises}
	</p>
	)
}

const Content = ({ parts }) => {
	return (
	<div>
		{
			parts.map(
				part => <Part key={part.id} name={part.name} exercises={part.exercises} />
			)
		}     
	</div>
	)
}

const Course = ({ courses }) => {
	return (
		<div>
			{
				courses.map( course => {
					return (
						<div key={course.id}>
							<Header name={course.name}/>
							<Content parts={course.parts}/>
							<Total parts={course.parts} />
						</div>
					)
				})
			}
		</div>	
	);
};

const App = () => {
	return <Course courses={Courses} />;
}

export default App;