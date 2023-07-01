import { Checkbox, HStack, Stack, Text } from '@chakra-ui/react';
import { useFilter, useTodos } from '../store';

const Todo = ({ id, title, completed }) => {
  const toggleTodo = useTodos((state) => state.toggleTodo);

  return (
    <HStack spacing={4}>
      <Checkbox isChecked={completed} onChange={() => toggleTodo(id)} />
      <Text>{title}</Text>
    </HStack>
  );
};

const TodoList = () => {
  const filter = useFilter((state) => state.filter);
  const todos = useTodos((state) => {
    switch (filter) {
      case 'completed':
        return state.todos.filter((todo) => todo.completed);
      case 'uncompleted':
        return state.todos.filter((todo) => !todo.completed);
      default:
        return state.todos;
    }
  });

  return (
    <Stack minH="300px">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Stack>
  );
};

export { TodoList };
