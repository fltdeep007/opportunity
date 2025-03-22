import React , { createContext , useState , useEffect , useCallback } from 'react'
import { userService } from '../services/userService'

export const UserContext = createContext()

export const UserProvider = ({  children }) =>{
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const generateRandomUserId = (existingUsers = [], minValue = 1000, maxValue = 1000000) => {

      const existingIds = existingUsers.map(user => Number(user.id));
      

      let randomId;
      do {

        randomId = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      } while (existingIds.includes(randomId)); 
      return randomId;
    };

    const fetchUsers = useCallback(async () =>{
        try {
            setLoading(true)
            const data = await userService.getAllUsers()
            setUsers(data)
            setLoading(null)
    }catch(error){
        setError('Failed to fetch Users. Please try again later')
        console.error(error)
    }finally{
        setLoading(false)
    }

    }, [])

    const fetchUser = useCallback(async(id) => {
      try {
        setLoading(true);
        
        
        const userInState = users.find(user => user.id === parseInt(id));
        
        if (userInState) {
      
          setLoading(false);
          return userInState;
        } else {
     
          const data = await userService.getUserById(id);
          return data;
        }
      } catch(error) {
        setError(`Failed to fetch User with ID ${id}`);
        console.error(error);
        return null;
      } finally {
        setLoading(false);
      }
    }, [users]);

const addUser = useCallback(async (user) => {
  try {
    setLoading(true);
    const apiResponse = await userService.addUser(user); 
    

    const clientId = generateRandomUserId(users);
    

    const newUser = { 
      ...user, 
      id: clientId,       
      apiId: apiResponse.id 
    };
    
 
    setUsers(prevUsers => [...prevUsers, newUser]);
    
    return newUser;
  } catch (err) {
    setError('Failed to add User. Please try again later');
    console.error(err);
    return null;
  } finally {
    setLoading(false);
  }
}, [users]);
const updateUser = useCallback(async(id,user) =>{
    try{
        setLoading(true)
        const updatedUser = await userService.updateUser(id,user)
        setUsers(prevUsers => prevUsers.map(u => u.id === parseInt(id) ? { ...u, ...user } : u))
        return updatedUser
        }catch(err){
            setError(`Failed to update User with ID ${id}`)
            console.error(err);
            return null
            }finally{
                setLoading(false)
                }
}, [])

const deleteUser = useCallback(async (id) => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== parseInt(id)));
      return { success: true };
    } catch (err) {
      setError(`Failed to delete user with ID ${id}.`);
      console.error(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <UserContext.Provider value={{
      users,
      loading,
      error,
      fetchUsers,
      fetchUser,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </UserContext.Provider>
  );

}
