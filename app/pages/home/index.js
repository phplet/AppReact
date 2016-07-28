'use strict';

import React from 'react';
import {
    ScrollView,
    Text,
    View,
    InteractionManager,
    Navigator,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import TabBar from './tab';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Toolbar from '../../components/toolbar';
import Flow from '../../components/flow';
import HomeFilter from '../../components/homeFilter';
import MyPage from '../my';
import DetailPage from '../detail';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this._jumpToDetailPage = this._jumpToDetailPage.bind(this);
        this._showFilter = this._showFilter.bind(this);
        this._onFilterClicked = this._onFilterClicked.bind(this);
        this.state = {
            showFilter: false,
            filterMounted: false,
        }
    }

    static defaultProps = {
        tabTile: {
            0: '首页',
            1: '频道',
            2: '',
            3: '消息',
            4: '我的'
        }

    };

    _jumpToDetailPage() {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: DetailPage,
                name: 'DetailPage',
                sceneConfigs: Navigator.SceneConfigs.FloatFromRight
            });
        });
    }

    _showFilter() {
        this.setState({showFilter: this.props.home.showFilter});
    }

    _onFilterClicked() {
        if (this.props.home.filterMounted) {
            this.props.home.showFilter = !this.props.home.showFilter;
            this._showFilter();
        }
    }

    render() {
        return (
            <View style={styles.container} visible='hidden'>
                <Toolbar
                    title="剁手记"
                    navigator={navigator}
                    showFilter={this._showFilter}
                    />
                <ScrollableTabView
                    style={{marginTop: 0, }}
                    tabBarPosition='overlayBottom'
                    initialPage={0}
                    renderTabBar={() => <TabBar {...this.props}/>}
                    >
                    <ScrollView tabLabel="ios-home-outline" style={styles.tabView}>
                        <Flow
                            press={this._jumpToDetailPage}
                            />
                    </ScrollView>
                    <ScrollView tabLabel="ios-compass-outline" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>1</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="md-camera" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>2</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-mail-outline" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>3</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-person-outline" style={styles.tabView}>
                        <MyPage />
                    </ScrollView>
                </ScrollableTabView>
                {[this.state.showFilter].map((show) => {
                    if (show) {
                        return (
                            <HomeFilter click={this._onFilterClicked} key=''/>
                        );
                    }
                })}

            </View>

        );
    }
}

function mapStateToProps(state) {
    const { home } = state;
    return {
        home
    };
}

export default connect(mapStateToProps)(Home);