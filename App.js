import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      var_a: '',
      var_b: '',
      var_c: '',
      result: '',
      var_n: '',
      prime: [],
    }
  }

  handleChangeA = (e) => {
    if (e == 0) {
      console.warn('Hệ số a phải khác 0, nhập lại!')
      this.setState({
        var_a: ''
      })
    }
    else {
      this.setState({
        var_a: e
      })
    }
    console.log('he so a: ', this.state.var_a)
  }

  handleChangeB = (e) => {
    this.setState({
      var_b: e
    })
  }

  handleChangeC = (e) => {
    this.setState({
      var_c: e
    })
  }

  handleChangeN = (e) => {
    this.setState({
      var_n: e
    })
  }

  clickCaculator = () => {
    const { var_a, var_b, var_c } = this.state
    let a = parseFloat(var_a)
    let b = parseFloat(var_b)
    let c = parseFloat(var_c)
    let temp = Math.pow(b, 2) - 4 * a * c
    if (var_a == '' && var_b == '' && var_c == '') {
      console.warn('Cần nhập hệ số để giải phương trình!');
    }
    else if (temp < 0) {
      this.setState({
        result: 'Phương trình vô nghiệm!'
      })
    }
    else if (temp == 0) {
      this.setState({
        result: 'Phương trình có nghiệm kép x1 = x2 = ' + (-b / (2 * a))
      })
    }
    else {
      let x1 = ((-b + Math.sqrt(temp)) / (2 * a)).toFixed(2)
      let x2 = ((-b - Math.sqrt(temp)) / (2 * a)).toFixed(2)
      this.setState({
        result: 'Phương trình có 2 nghiệm phân biệt x1 = ' + x1 + ' và x2 = ' + x2
      })
    }
  }

  resetPt = () => {
    const { var_a, var_b, var_c, result } = this.state
    if (var_a == '' && var_b == '' && var_c == '' && result == '') {
      console.warn('Đã được làm mới!')
    }
    this.setState({
      var_a: '',
      var_b: '',
      var_c: '',
      result: '',
    })
  }

  clickDisplay = () => {
    const { var_n } = this.state
    if (var_n == '') {
      console.warn('Cần nhập n!');
    }
    else {
      if (var_n <= 1) {
        this.setState({
          prime: 'không có số nguyên tố nào!'
        })
      }
      else {
        let arr = []
        for (let i = 2; i <= var_n; i++) {
          let dem = 0;
          for (let j = 2; j <= i / 2; j++) {
            if (i % j == 0) {
              dem++
              break;
            }
          }
          if (dem == 0) {
            arr.push(i)
            this.setState({
              prime: arr
            })
          }
        }
      }
    }
  }

  resetPrime = () => {
    const { var_n, prime } = this.state
    if (var_n == '' && prime == '') {
      console.warn('Đã được làm mới!')
    }
    this.setState({
      var_n: '',
      prime: []
    })
  }

  render() {
    const { var_a, var_b, var_c, var_n, result, prime } = this.state
    return (
      <View style={styles.container}>
        <StatusBar style={styles.auto} />
        <LinearGradient
          colors={['white', '#87CEFA']}>
          <Text style={styles.titleApp}>Week Three</Text>
        </LinearGradient>

        
        <View style={styles.panelMath}>
          <Text style={styles.cssText}>1.Giải phương trình bậc 2</Text>

          <View style={styles.panelInput}>
            <View style={styles.boxInput}>
              <Text style={styles.textInput}>Nhập a: </Text>
              <TextInput
                keyboardType='numeric'
                style={styles.cssInput}
                placeholder='Nhập hệ số a'
                value={var_a}
                onChangeText={e => this.handleChangeA(e)} />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.textInput}>Nhập b: </Text>
              <TextInput
                keyboardType='numeric'
                style={styles.cssInput}
                placeholder='Nhập hệ số b'
                value={var_b}
                onChangeText={e => this.handleChangeB(e)} />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.textInput}>Nhập c: </Text>
              <TextInput
                keyboardType='numeric'
                value={var_c}
                style={styles.cssInput}
                placeholder='Nhập hệ số c'
                onChangeText={e => this.handleChangeC(e)} />
            </View>
          </View>

          <View style={styles.panelButton}>
            <View style={styles.caculator}>
              <TouchableOpacity >
                <LinearGradient
                  colors={['white', '#87CEFA']}
                  style={styles.border}>
                  <Text
                    style={styles.textBtn}
                    onPress={this.clickCaculator}
                  >
                    Tính nghiệm
                </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.reset}>
              <TouchableOpacity >
                <LinearGradient
                  colors={['white', '#87CEFA']}
                  style={styles.border}>
                  <Text
                    style={styles.textBtn}
                    onPress={this.resetPt}
                  >
                    Làm mới
                </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </View>
          <Text>Kết quả: {result} </Text>
        </View>

        <View style={styles.panelMath}>
          <Text style={styles.cssText}>2.Tìm số nguyên tố từ 1 đến n</Text>
          <View style={styles.panelInput}>

            <View style={styles.boxInput}>
              <Text style={styles.textInput}>Nhập n: </Text>
              <TextInput
                value={var_n}
                keyboardType='numeric'
                style={styles.cssInput}
                placeholder='Nhập số nguyên n'
                onChangeText={e => this.handleChangeN(e)} />
            </View>

            <View style={styles.panelButton}>
              <View style={styles.display}>
                <TouchableOpacity >
                <LinearGradient
                  colors={['white', '#87CEFA']}
                  style={styles.border}>
                  <Text
                    style={styles.textBtn}
                    onPress={this.clickDisplay}
                  >
                    Hiển thị
                </Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.display}>
                <TouchableOpacity >
                <LinearGradient
                  colors={['white', '#87CEFA']}
                  style={styles.border}>
                  <Text
                    style={styles.textBtn}
                    onPress={this.resetPrime}
                  >
                    Làm mới
                </Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text> Kết quả(các số nguyên tố từ 1 - n): </Text>
              {var_n > 1 &&
                <Text>
                  {prime.map(element => <Text key={element}>{element}  </Text>)}
                </Text>}
            </View>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  auto:{
    backgroundColor:'red',
  },
  titleApp: {
    // backgroundColor: '#FFCC33',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 23
  },
  panelMath: {
    padding: 10,
  },
  cssText: {
    fontSize: 19,
    color: '#3399FF',
    fontWeight: 'bold'
  },
  panelInput: {
    paddingRight: 20,
  },
  boxInput: {
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 75,
  },
  cssInput: {
    flex: 3,
    marginTop: 15,
    marginBottom: 20,
    paddingLeft: 7,
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
  },
  panelButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  caculator: {
    flex: 1,
    borderRadius: 35,
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 19,
    fontWeight: 'bold',
    // backgroundColor: '#FFCC33',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    // borderWidth: 1,
  },
  border:{
    borderWidth:1,
    borderRadius:40,
  },
  reset: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 50,
  },
  display: {
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  }
});
