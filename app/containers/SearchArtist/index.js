import React from 'react';
import { Platform, View, ActivityIndicator, Image, ScrollView, StyleSheet, TextInput,SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { images, fonts } from 'app/themes';
import AppContainer from 'app/components/Container';
import { hp, wp } from 'app/utils/ResponsiveScreen';

import {
  selectArtist,
  selectUserIsLoading,
  selectUserErrorMessage
} from './selectors';
import { searchArtistActions } from './reducer';
/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const Container = styled(AppContainer)`
  flex: 1;
`;

const TextBox = styled.Text`
  ${fonts.style.standard()};
  text-align: center;
  margin-bottom: 5px;
`;

const Instructions = styled.Text`
  ${fonts.style.standard()};
  text-align: center;
  margin-bottom: 5;
  font-style: italic;
`;

const Result = styled.Text`
  ${fonts.style.standard()};
  text-align: center;
  margin-bottom: 5;
`;

const CharacterImage = styled.Image`
  height: 80px;
  width: 80px;
  margin: 0 auto;
`;

const Error = styled.Text`
  ${fonts.style.standard()};
  text-align: center;
  margin-bottom: 5px;
  color: red;
`;

const LogoContainer = styled.View`
  width: 100%;
  height: 80px;
`;
const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;

const SeparatedView = styled.View`
  > * {
    margin: 10px;
  }
`;
const CustomButton = styled.Button`
  margin-top: 40px;
`;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android:
    'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.'
});

const Input = styled.TextInput`
    padding-left: 3%;
    border-width: 0.5; 
    border-radius: 5; 
    margin-horizontal: 5%;
    margin-top: 2%;
    height: 4%
`
const styles = StyleSheet.create({
  activityStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  gridCOntainer: {
    flex : 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical:hp(2)
  },
  imageStyle: {
    height: hp(20),
    width: wp(40),
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: wp(1),
    marginBottom:hp(1)
  },
  listView: {
    width: wp(42),
    marginLeft: wp(5),
    marginBottom: wp(5),
    alignItems: "center",
  },
  inputStyle : {
    paddingLeft: wp(3),
    borderWidth: 0.5, 
    borderRadius: wp(1), 
    marginHorizontal: wp(5),
    marginTop: hp(2),
    marginBottom:hp(2),
    height: hp(4)
  },
  loadingStyle : {
    flex : 1
  }
})

class ExampleScreen extends React.Component {

  requestFetchArtist = artistName => {    
    if(this.timeOut) clearTimeout(this.timeOut)
    this.timeOut = setTimeout( () => this.props.fetchArtist(artistName)
    ,1000);
  };

  render() {
    console.log("user: ", this.props.userIsLoading)
    return (
      <SafeAreaView style = { {flex: 1 }}>
      <Container>
            <View testID="example-container-content" style = { {flex: 1 }}>
              <LogoContainer>
                <Logo source={images.logo} resizeMode="contain" />
              </LogoContainer>
              <TextBox>Enter Artist Name</TextBox>
              <TextInput style={styles.inputStyle} placeholder="Search Artist" onChangeText={text => this.requestFetchArtist(text)} />
              {
                  this.props.userIsLoading ? <View style={styles.loadingStyle}>
                  <ActivityIndicator style={styles.activityStyle} testID="loader" size="large" color="#0000ff" />
                   </View> :
              <ScrollView>
                
                                   <View style={styles.gridCOntainer}>
                                   {
                                     this.props.artist.map((item, index) => {
                                       return (
                                         <View key={index} style={styles.listView}>
                                           <Image
                                             style={styles.imageStyle}
                                             source={{
                                               uri: item.artworkUrl100
                                             }}
                                           />
                                           <TextBox>{item.artistName}</TextBox>
                                         </View>
                                       )
                                     })
                                   }
                                 </View>
                 
              </ScrollView>
                }
            </View>
      </Container>
      </SafeAreaView>
    );
  }
}

ExampleScreen.propTypes = {
  artist: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchArtist: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  artist: selectArtist(),
  userIsLoading: selectUserIsLoading(),
  userErrorMessage: selectUserErrorMessage()
});

const mapDispatchToProps = dispatch => ({
  fetchArtist: artistName => dispatch(searchArtistActions.requestFetchArtist(artistName))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  injectIntl
)(ExampleScreen);
export { ExampleScreen as ExampleScreenTest };
