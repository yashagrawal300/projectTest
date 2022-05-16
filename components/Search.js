

function Search(props) {
  return (
    <div>            
        <form class="form-inline my-2 my-lg-4 d-flex justify-content-center">
    <input class="form-control w-50 border border-danger rounded" type="search" placeholder={props.placeholder} aria-label="Search"/>
    {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
  </form>
  </div>
  )
}

export default Search