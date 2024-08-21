import React, { useState } from 'react';
import{useDispatch} from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { AddClassAPI } from './redux/action/ClassAction';

const AddScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [tenLop, setTenLop] = useState('');
  const [soPhong, setSoPhong] = useState('');
  const [soGhe, setSoGhe] = useState('');
  const [khuNha, setKhuNha] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleAddClass = () => {
    // Xử lý thêm lớp học ở đây, có thể gọi action hoặc API tương ứng
    console.log('Thêm  Nha Hang:');
    console.log('Tên :', tenLop);
    console.log('Gia:', soPhong);
    console.log('Mo ta:', soGhe);
    console.log('Ngay Nhap:', khuNha);
    console.log('Link hình ảnh:', hinhAnh);

    let objcl ={ten_NhaHang_ph39264:tenLop,giatien_ph39264:soPhong,
        mota:soGhe,ngay_nhap:khuNha,hinh_anh_ph39264:hinhAnh}
dispatch(AddClassAPI(objcl))
.then((result)=>{
  console.log(' class add successfully');
  setSuccessMessageVisible(true);
  setTimeout(() => {
    setSuccessMessageVisible(false);
    navigation.navigate('Home');
  }, 2000); 
})
.catch((err)=>{
  console.log('error add class:', err);
})
      
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Recall</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Add </Text>
      <TextInput
        style={styles.input}
        placeholder="input name "
        value={tenLop}
        onChangeText={text => setTenLop(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="input price"
        value={soPhong}
        onChangeText={text => setSoPhong(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="input detail"
        value={soGhe}
        onChangeText={text => setSoGhe(text)}
        
      />
      <TextInput
        style={styles.input}
        placeholder="input date"
        value={khuNha}
        onChangeText={text => setKhuNha(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Link image"
        value={hinhAnh}
        onChangeText={text => setHinhAnh(text)}
      />
      <TouchableOpacity onPress={handleAddClass} style={styles.addButton}>
        <Text style={styles.addText}>Add New</Text>
      </TouchableOpacity>

      <Modal visible={successMessageVisible} transparent={true} animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Add successfully!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
