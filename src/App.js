import React, { useState, useEffect } from 'react';

function App() {
  // Load tasks from localStorage or initialize as an empty array
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited
  const [editedText, setEditedText] = useState(''); // Track the edited text
  const [category, setCategory] = useState(''); // Track the selected category
  const [priority, setPriority] = useState(''); // Track the selected priority
  const [Persons, setPersons] = useState('');
  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        category: category,
        priority: priority,
        Persons: Persons,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditedText(text);
  };

  // Save the edited task
  const saveEditedTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editedText } : task
      )
    );
    setEditingTaskId(null);
    setEditedText('');
  };

  return (

    <div style={styles.container}>
      <h1>IT General Report</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new report"
          style={styles.input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="ATM Esclation">ATM Esclation</option>
          <option value="Network Escalation">Network Escalation</option>
          <option value="EJ Request">EJ Request</option>
        </select>
        <select
          value={Persons}
          onChange={(e) => setPersons(e.target.value)}
          style={styles.select}
        >
          <option value="Zeydan">Zeydan</option>
          <option value="Aschalew">Aschalew</option>
          <option value="Mekonnen">Mekonnen</option>
          <option value="Robel">Robel</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.select}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask} style={styles.addButton}>
          Add Task
        </button>
      </div>
      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              style={styles.checkbox}
            />
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                style={styles.editInput}
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  flex: 1,
                }}
              >
                {task.text} (Category: {task.category}, Priority: {task.priority}, Persons: {task.Persons})
              </span>
            )}
            {editingTaskId === task.id ? (
              <button
                onClick={() => saveEditedTask(task.id)}
                style={styles.saveButton}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEditing(task.id, task.text)}
                style={styles.editButton}
              >
                Edit
              </button>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Styles for the app
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  checkbox: {
    marginRight: '10px',
  },
  editInput: {
    flex: 1,
    padding: '5px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

export default App;