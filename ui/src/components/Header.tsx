export default function Header(){
    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark  bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">BGG Comparison</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/*<div className="collapse navbar-collapse" id="navbarCollapse">*/}
                    {/*    <ul className="navbar-nav me-auto mb-2 mb-md-0">*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <a className="nav-link active" aria-current="page" href="#">Home</a>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <a className="nav-link" href="#">Link</a>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <a className="nav-link disabled" aria-disabled="true">Disabled</a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*    <form className="d-flex" role="search">*/}
                    {/*        <input className="form-control me-2" type="search" placeholder="Search"*/}
                    {/*               aria-label="Search"/>*/}
                    {/*        <button className="btn btn-outline-success" type="submit">Search</button>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                </div>
            </nav>
        </header>
    )
}