import { useEffect, useState } from 'react'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Pagination from './components/Pagination'
import UserList from './components/UserList'
import UserSearch from './components/UserSearch'
import Spinner from './components/Spinner'
import { apiKey, BASE_URL } from './keys'
import SaveUserModal from './components/SaveUserModal'

function App() {
    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);

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

    const addUserClickHandler = () => {
        setShowSaveUserModal(true);
    }

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
    }

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} />

                    {/* New user button  */}
                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                    {showSaveUserModal && <SaveUserModal onClose={addUserCloseHandler} />}

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>

    )
}

export default App
