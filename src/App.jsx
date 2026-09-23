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
        fetchUsers()
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const addUserClickHandler = () => {
        setShowSaveUserModal(true);
    }

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
    }

    const submitUserHandler = async (user) => {
        try {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey,
                },
                body: JSON.stringify(user)
            });

            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
        } catch (error) {
            alert(error);
        } finally {
            setShowSaveUserModal(false);
        }
        
    }

    const userUpdateHandler = async () => {
        try {
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} onUserUpdate={userUpdateHandler}/>

                    {/* New user button  */}
                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                    {showSaveUserModal && <SaveUserModal onClose={addUserCloseHandler} onSubmit={submitUserHandler}/>}

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>

    )
}

export async function fetchUsers() {
    const response = await fetch(BASE_URL, {
        headers: {
            'apiKey': apiKey
        }
    })

    const data = await response.json();

    return data;
}

export default App
