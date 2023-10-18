

const Header = ({ name }) => <h1>{name}</h1>

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ name, exercises }) => {
	return (
	<p>
		{name} {exercises}
	</p>
	)
}

const Content = ({ name, exercises }) => {
	return (
	<div>
		<Part
			name={name} exercises={exercises} />	aS
			
		<Part
			name={name} exercises={exercises} />
		<Part
			name={name} exercises={exercises} />      
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

	return <Course name={course.name}/>
}

export default App;