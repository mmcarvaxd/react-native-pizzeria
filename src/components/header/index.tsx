import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = (props: any) => {
  let { title } = props

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
};

export default Header;