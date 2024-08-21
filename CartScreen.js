// CartScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; 
import {removeFromCart} from './redux/reducer/ClassReducer'

const CartScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Lưu thông tin của mục được chọn

  const cartItems = useSelector(state => state.class.cart);
  const dispatch = useDispatch(); // Khai báo dispatch

  // Hàm mở modal và thiết lập thông tin cho mục được chọn
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
      <Text style={styles.header}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.ten_NhaHang_ph39264}</Text>
              <Text style={styles.itemPrice}>Giá: {item.giatien_ph39264}</Text>
              {/* Thêm các thông tin khác của mục vào đây nếu cần */}
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <View>
                            <Image source={{ uri: selectedItem.image }} style={styles.image} />

                <Text style={styles.modalItemName}>{selectedItem.ten_NhaHang_ph39264}</Text>
                <Text style={styles.modalItemName}>Số ghế: {selectedItem.mota}</Text>

                <Text style={styles.modalItemPrice}>Giá: {selectedItem.giatien_ph39264}</Text>
                {/* Hiển thị các thông tin khác của mục ở đây nếu cần */}
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
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
  modalItemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItemPrice: {
    fontSize: 20,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartScreen;
