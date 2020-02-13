// Components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native'
import FilmItem from "./FilmItem"
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.state = {
            films: [] }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ films: data.results })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <Button title='Rechercher' onPress={() => this._loadFilms()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 40
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 5,
        marginBottom: 10
    }
})

export default Search

