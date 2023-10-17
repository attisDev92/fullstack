

const Header = ({ name }) => <h1>{name}</h1>;

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

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

const Course = ({ name, parts }) => {
	return (
		<div>
			<Header name={name}/>
			<Content parts={parts}/>
		</div>
	);
};

const App = ({ course }) => {

	return <Course name={course.name} parts={course.parts} />
}

export default App;