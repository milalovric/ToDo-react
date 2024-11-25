import { Task } from "../types/Task";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const addTask = async (task: Omit<Task,"id">): Promise<string> => {
    try{
        const docRef = await addDoc(collection(db, 'tasks'), task);
        return docRef.id;

    }catch(error){
        console.error('Error adding task:', error);
        return "";
    }

};