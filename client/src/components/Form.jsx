const Form = () => {
  const handleSubmit = () => {}
  const handleChange = () => {}
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <br />
        <input id="title" type="text" onChange={handleChange} />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          cols="50"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="image">Image:</label>
        <br />
        <input id="image" type="text" onChange={handleChange} />
        <button type="submit">Submit!</button>
      </form>
    </div>
  )
}

export default Form
