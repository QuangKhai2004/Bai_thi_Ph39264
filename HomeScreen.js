import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteClassAPI, fetchClass,addToCart } from './redux/action/ClassAction';
import { useNavigation } from '@react-navigation/native';

import { addid, deleteClass, updateClass } from '../redux/reducer/ClassReducer';

const HomeScreen = () => {
 
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const listClass = useSelector(state => state.class.class);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  useEffect(()=>{
    dispatch(fetchClass())
  },[dispatch]);

  const handleDelete= async (itemId) =>{
    setDeleteItemId(itemId)
    setConfirmModalVisible(true)
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); 
  };
  const goCart = () => {
    navigation.navigate("Cart") 
  };

  const confirmDelete =()=>{
    dispatch(DeleteClassAPI(deleteItemId))
    .then((result)=>{
      console.log('Delete successfully');
      setConfirmModalVisible(false)
    })
    .catch((err)=>{
      console.error('error dele' , err)
      setConfirmModalVisible(false)
    })
  }
  return (
    <ScrollView>
      <View>
       
        {listClass.map((item, index) => (
          <View key={index} style={styles.classContainer}>

            <Image source={{ uri: item.hinh_anh_ph39264 }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Name: {item.ten_NhaHang_ph39264}</Text>
              <Text style={styles.text}>Price:  {item.giatien_ph39264}</Text>         
                   <Text style={styles.text}>Date: {item.mota}</Text>
              <Text style={styles.text}>Date: {item.ngay_nhap}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
              <Text style={styles.actionText}>delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Update', { itemId: item.id, itemData: item })} style={styles.actionButton}>
              <Text style={styles.actionText}>Update</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.actionButton}>
              <Text style={styles.actionText}>add to cart</Text>
            </TouchableOpacity> */}
          </View>
        ))}

        <Modal visible={confirmModalVisible} transparent={true} animationType='fade'>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure delete this item?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setConfirmModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.modalButtonText}>Cancle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDelete} style={[styles.modalButton, styles.deleteButton]}>
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* <TouchableOpacity onPress={() => goCart()} style={styles.actionButton}>
              <Text style={styles.actionText}> giỏ hàng</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => navigation.navigate('Add')}style={styles.actionButton}>
              <Text style={styles.actionText}>Add New</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  classContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    marginBottom: 5,
  },
  actionButton: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    alignItems:'center',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    margin: 20,

    padding: 10,
    borderRadius: 5,
  },
  backText: {
    color: 'black',
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
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  deleteButton: {
    backgroundColor: 'black',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
