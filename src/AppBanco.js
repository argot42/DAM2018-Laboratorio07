import React, {Component} from 'react';
import {ToastAndroid,Button, StyleSheet, Text, TextInput, Picker, View, Switch, CheckBox, Slider} from 'react-native';

export default class AppBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneda: 1,
            capitalInicial: '0',
            capitalFinal: 0,

            swAvisarEmail: false,
            chkCondiciones: false,
            tiEmail: 'foobar@example.org',
            tiCUIT: '00-00000000-0',
            sDias: 10,
            tResultados: ''
        };

        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
    }

    hacerPlazoFijo() {
        var coin = "";
        if (this.state.moneda == 1) {
            coin = "USD";
        } else if (this.state.moneda == 2) {
            coin = "ARS";
        }

        var m = parseFloat(this.state.capitalInicial);
        var tasa = 0.0;
        if (this.state.sDias < 30) {
            if (m <= 5000) { tasa = 25.0; }
            else if (m > 5000 && m <= 99999) { tasa = 30.0; }
            else if (m > 99999) { tasa = 35.0; }

        } else if (this.state.sDias >= 30) {
            if (m <= 5000) { tasa = 27.5; }
            else if (m > 5000 && m <= 99999) { tasa = 32.3; }
            else if (m > 99999) { tasa = 38.5; }

        }

        var final = m * ( (Math.pow((1 + tasa/100), this.state.sDias/360)) - 1 )
        this.setState({ capitalFinal: final });

        this.setState({
            //tResultados: "Capital Inicial: " + this.state.capitalInicial + " -> " + "Capital Final: " + this.state.capitalFinal.toString()
            tResultados: "coin: " + coin + "\n" + 
            "inicial: " + this.state.capitalInicial + "\n" + 
            "final: " + final.toString() + "\n" + 
            "tasa: " + tasa + "\n" +
            "dias: " + this.state.sDias + "\n"
        });
    }

    checkBoxChange() {
        this.setState({chkCondiciones: !this.state.chkCondiciones});
        if (this.state.chkCondiciones) {
            ToastAndroid.show('Es obligatorio aceptar las condiciones', ToastAndroid.LONG);
            this.setState({tResultados: ''});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Correo Electronico</Text>
                <TextInput
                    onChangeText={(text) => this.setState({tiEmail:text})}
                    value={this.state.tiEmail}
                />
                <Text>CUIT</Text>
                <TextInput
                    onChangeText={(text) => this.setState({tiCUIT:text})}
                    value={this.state.tiCUIT}
                />
                <Text>Moneda</Text>
                <Picker
                    style={{width: 200}}
                    selectedValue={this.state.moneda}
                    onValueChange={(valor) => this.setState({moneda:valor})}>
                    <Picker.Item label="Dolar" value="1" />
                    <Picker.Item label="Pesos ARS" value="2" />
                </Picker>
                <Text>Monto</Text>
                <TextInput
                    onChangeText={(text) => this.setState({capitalInicial:text})}
                    value={this.state.capitalInicial}
                />
                <Text>Dias</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={180}
                    onValueChange={(days) => this.setState({sDias:days})}
                    step={1}
                    value={this.state.sDias}
                />
                <Text>{this.state.sDias}{" dias"}</Text>
                <Switch
                    onValueChange={() => this.setState({swAvisarEmail: !this.state.swAvisarEmail})}
                    value={this.state.swAvisarEmail}
                />
                <Text>Avisar por mail</Text>
                <CheckBox 
                    title='Acepto condiciones'
                    value={this.state.chkCondiciones}
                    onChange={this.checkBoxChange}
                />
                <Button 
                    title="Hacer Plazo Fijo"
                    disabled={!this.state.chkCondiciones}
                    onPress={this.hacerPlazoFijo}>
                </Button>
                <Text>{this.state.tResultados}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
