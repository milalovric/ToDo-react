import { Task } from "../types/Task";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";


export const addTask = async (task: Omit<Task,"id">): Promise<string> => {
    try{
        const docRef = await addDoc(collection(db, 'tasks'), task);
        return docRef.id;

    }catch(error){
        console.error('Error adding task:', error);
        return "";
    }

};

export const getUserTasks = async (userId: string): Promise<Task[]> => {
    try {
      const q = query(collection(db, "tasks"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)
      );
    } catch (error) {
      console.error("Error getting user tasks:", error);
      throw error;
    }
  
  };
  
   
  
  export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
    try {
      await updateDoc(doc(db, "tasks", taskId), updates);

    } catch (error) {
      console.error("Error updating task:", error);
  
      throw error;
  
    }
  
  };
  
   
  
  export const deleteTask = async (taskId: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      
    } catch (error) {
  
      console.error("Error deleting task:", error);
  
      throw error;
  
    }
  
  };

  export const getUserTasksRealtime = (
    userId: string,
    callback: (tasks: Task[]) => void
  ) => {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    return onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)
  );
    callback(tasks);
    });
  };