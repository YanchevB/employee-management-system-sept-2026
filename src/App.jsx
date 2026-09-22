import { useEffect, useState } from 'react'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Pagination from './components/Pagination'
import UserList from './components/UserList'
import UserSearch from './components/UserSearch'
import Spinner from './components/Spinner'
import { apiKey, BASE_URL } from './keys'

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}`, {
            headers: {
                'apiKey': apiKey,
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} />

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
