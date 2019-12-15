import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useHistory} from 'react-router-native';
import {
  Container,
  Header,
  Content,
  Text,
  Form,
  Button,
  Item,
  Label,
  Input,
  Title,
  Left,
  Body,
  Right,
  Icon,
} from 'native-base';

import {
  AuthContext,
  SharedDataContext,
  addData,
  fetchInitial,
} from '../contexts';
import {getEmployees, createEmployee, signOut} from '../apis';
import {EmployeeList} from '../components';

const styles = StyleSheet.create({
  list: {margin: 15},
  button: {margin: 15, marginBottom: 50},
});

const AdminScreen = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const {state, dispatch} = useContext(SharedDataContext);

  useEffect(() => {
    getEmployees().then(data => dispatch(fetchInitial(data)));
  }, [dispatch]);

  const addEmployee = () => {
    createEmployee(name).then(employee => {
      dispatch(addData(employee));
      setName('');
    });
  };

  const handleSignOut = () => {
    signOut().then(() => {
      auth.signout(() => {
        history.push('/');
      });
    });
  };
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Employees</Title>
        </Body>
        <Right>
          <Button transparent onPress={handleSignOut} onClick={handleSignOut}>
            <Icon name="log-out" />
          </Button>
        </Right>
      </Header>
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>Employee Name</Label>
            <Input
              autoCapitalize="none"
              value={name}
              onChangeText={text => setName(text)}
            />
          </Item>
        </Form>
        <Button
          block
          style={styles.button}
          onPress={addEmployee}
          onClick={addEmployee}>
          <Text>Add</Text>
        </Button>
        <EmployeeList data={state} />
      </Content>
    </Container>
  );
};

export default AdminScreen;