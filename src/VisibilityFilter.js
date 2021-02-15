export default function VisibilityFilter({ store }) {
  const onChange = ({ target: { dataset } }) => {
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: dataset.filter
    })
  }

  return (
    <>
      <div className="btn-group" role="group" aria-label="visibility filter">
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          onChange={onChange}
          data-filter="SHOW_ALL"
          defaultChecked
        />
        <label className="btn btn-outline-secondary" htmlFor="btnradio1">
          All
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
          onChange={onChange}
          data-filter="SHOW_ACTIVE"
        />
        <label className="btn btn-outline-secondary" htmlFor="btnradio2">
          Active
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          autoComplete="off"
          onChange={onChange}
          data-filter="SHOW_COMPLETED"
        />
        <label className="btn btn-outline-secondary" htmlFor="btnradio3">
          Completed
        </label>
      </div>
    </>
  )
}
