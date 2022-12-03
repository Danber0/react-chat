const foo = async () => {
  const data = fetch('https://jsonplaceholder.typicode.com/todos/1').then((resp) => resp.json()).then((json) => console.log(json))

}