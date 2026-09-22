import { useState } from 'react'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Pagination from './components/Pagination'
import UserList from './components/UserList'
import UserSearch from './components/UserSearch'

function App() {

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList />

                    {/* New user button  */}
                    <button className="btn-add btn">Add new user</button>

                    <Pagination />
                </section>
            </main>
            
            <Footer />
        </>

    )
}

export default App
