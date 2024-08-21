import React, { useState } from 'react';
import{useDispatch} from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { addClassAPI, UpdateClassAPI } from './redux/action/ClassAction';

const UpdateScreen = ({ navigation, route }) => {
  const { itemId, itemData } = route.params;
  const dispatch = useDispatch();
  const [tenLop, setTenLop] = useState(itemData.ten_NhaHang_ph39264);
  const [soPhong, setSoPhong] = useState(itemData.giatien_ph39264);
  const [soGhe, setSoGhe] = useState(itemData.ngay_nhap);
  const [khuNha, setKhuNha] = useState(itemData.mota);
  const [hinhAnh, setHinhAnh] = useState(itemData.hinh_anh_ph39264);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
 

  const handleUpdateClass = () => {
    const newData = {
        ten_NhaHang_ph39264: tenLop,
        giatien_ph39264: soPhong,
        ngay_nhap: soGhe,
        mota: khuNha,
        hinh_anh_ph39264: hinhAnh
    };

dispatch(UpdateClassAPI({id:itemId, data:newData}))
.then((result)=>{
  console.log(' class update successfully');
  setSuccessMessageVisible(true);
  setTimeout(() => {
    setSuccessMessageVisible(false);
    navigation.goBack();
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
      <Text style={styles.title}>Update</Text>
      <TextInput
        style={styles.input}
        placeholder="input name"
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
        placeholder="input date"
        value={soGhe}
        onChangeText={text => setSoGhe(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="input detail"
        value={khuNha}
        onChangeText={text => setKhuNha(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Link image"
        value={hinhAnh}
        onChangeText={text => setHinhAnh(text)}
      />
      <TouchableOpacity onPress={handleUpdateClass} style={styles.addButton}>
        <Text style={styles.addText}>Update</Text>
      </TouchableOpacity>

      <Modal visible={successMessageVisible} transparent={true} animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Update successfully!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateScreen;

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
