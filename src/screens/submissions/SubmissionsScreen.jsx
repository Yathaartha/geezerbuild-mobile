import React from 'react';
import {ScrollView} from 'react-native';
import SubmissionsTable from '../../components/submissions/SubmissionsTable';

const SubmissionsScreen = () => {
  return (
    <ScrollView>
      <SubmissionsTable />
    </ScrollView>
  );
};

export default SubmissionsScreen;
