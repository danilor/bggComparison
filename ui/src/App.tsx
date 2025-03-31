import Header from "./components/Header.tsx";

import MainTable from "./components/MainTable.tsx";

function App() {

  return (
      <>


        <Header />




          <div className="container">

              <div className="row justify-content-center mt-3">
                  <div className="col">
                     <MainTable/>
                  </div>

              </div>

          </div>


      </>
  )
}

export default App
