(function () {
    var c = {};
    function trans(e, f) {
        var g = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
        c[g[0x0]] = g;
        return '';
    }
    function regTextVar(h, i) {
        var j = ![];
        i = i['toLowerCase']();
        var k = function () {
            var t = this['get']('data');
            t['updateText'](t['translateObjs'][h]);
        };
        var l = function (u) {
            var v = u['data']['nextSelectedIndex'];
            if (v >= 0x0) {
                var w = u['source']['get']('items')[v];
                var x = function () {
                    w['unbind']('begin', x, this);
                    k['call'](this);
                };
                w['bind']('begin', x, this);
            } else
                k['call'](this);
        };
        var m = function (y) {
            return function (z) {
                if (y in z) {
                    k['call'](this);
                }
            }['bind'](this);
        };
        var n = function (A, B) {
            return function (C, D) {
                if (A == C && B in D) {
                    k['call'](this);
                }
            }['bind'](this);
        };
        var o = function (E, F, G) {
            for (var H = 0x0; H < E['length']; ++H) {
                var I = E[H];
                var J = I['get']('selectedIndex');
                if (J >= 0x0) {
                    var K = F['split']('.');
                    var L = I['get']('items')[J];
                    if (G !== undefined && !G['call'](this, L))
                        continue;
                    for (var M = 0x0; M < K['length']; ++M) {
                        if (L == undefined)
                            return '';
                        L = 'get' in L ? L['get'](K[M]) : L[K[M]];
                    }
                    return L;
                }
            }
            return '';
        };
        var p = function (N) {
            var O = N['get']('player');
            return O !== undefined && O['get']('viewerArea') == this['MainViewer'];
        };
        switch (i) {
        case 'title':
        case 'subtitle':
            var r = function () {
                switch (i) {
                case 'title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                }
            }();
            if (r) {
                return function () {
                    var P = this['_getPlayListsWithViewer'](this['MainViewer']);
                    if (!j) {
                        for (var Q = 0x0; Q < P['length']; ++Q) {
                            P[Q]['bind']('changing', l, this);
                        }
                        j = !![];
                    }
                    return o['call'](this, P, r, p);
                };
            }
            break;
        default:
            if (i['startsWith']('quiz.') && 'Quiz' in TDV) {
                var s = undefined;
                var r = function () {
                    switch (i) {
                    case 'quiz.questions.answered':
                        return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                    case 'quiz.question.count':
                        return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                    case 'quiz.items.found':
                        return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                    case 'quiz.item.count':
                        return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                    case 'quiz.score':
                        return TDV['Quiz']['PROPERTY']['SCORE'];
                    case 'quiz.score.total':
                        return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                    case 'quiz.time.remaining':
                        return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                    case 'quiz.time.elapsed':
                        return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                    case 'quiz.time.limit':
                        return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                    case 'quiz.media.items.found':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                    case 'quiz.media.item.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                    case 'quiz.media.score':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                    case 'quiz.media.score.total':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                    case 'quiz.media.index':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                    case 'quiz.media.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                    case 'quiz.media.visited':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                    default:
                        var R = /quiz\.([\w_]+)\.(.+)/['exec'](i);
                        if (R !== undefined) {
                            s = R[0x1];
                            switch ('quiz.' + R[0x2]) {
                            case 'quiz.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            }
                        }
                    }
                }();
                if (r) {
                    return function () {
                        var S = this['get']('data')['quiz'];
                        if (S) {
                            if (!j) {
                                if (s != undefined)
                                    S['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], n['call'](this, s, r), this);
                                else
                                    S['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], m['call'](this, r), this);
                                j = !![];
                            }
                            try {
                                var T = s != undefined ? S['getObjective'](s, r) : S['get'](r);
                                if (r == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                    T += 0x1;
                                return T;
                            } catch (U) {
                                return undefined;
                            }
                        }
                    };
                }
            }
            break;
        }
        return '';
    }
    function createQuizConfig(player, V) {
        var W = {};
        W['player'] = player;
        W['playList'] = V;
        function X(a0) {
            for (var a1 = 0x0; a1 < a0['length']; ++a1) {
                var a2 = a0[a1];
                if ('id' in a2)
                    player[a2['id']] = a2;
            }
        }
        if (W['questions']) {
            X(W['questions']);
            for (var Y = 0x0; Y < W['questions']['length']; ++Y) {
                var Z = W['questions'][Y];
                X(Z['options']);
            }
        }
        if (W['objectives']) {
            X(W['objectives']);
        }
        if (W['califications']) {
            X(W['califications']);
        }
        if (W['score']) {
            player[W['score']['id']] = W['score'];
        }
        if (W['question']) {
            player[W['question']['id']] = W['question'];
        }
        if (W['timeout']) {
            player[W['timeout']['id']] = W['timeout'];
        }
        player['get']('data')['translateObjs'] = c;
        return W;
    }
    var d = {"start":"this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_1BB4389B_0BC0_3C1B_418E_A5B3D42225F3], 'cardboardAvailable')","id":"rootPlayer","propagateClick":false,"desktopMipmappingEnabled":false,"paddingTop":0,"mediaActivationMode":"window","paddingLeft":0,"scrollBarMargin":2,"borderSize":0,"paddingBottom":0,"layout":"absolute","scrollBarColor":"#000000","defaultVRPointer":"laser","mobileMipmappingEnabled":false,"downloadEnabled":false,"minHeight":20,"width":"100%","scrollBarOpacity":0.5,"toolTipHorizontalAlign":"center","verticalAlign":"top","shadow":false,"contentOpaque":false,"children":["this.MainViewer","this.IconButton_1BB4389B_0BC0_3C1B_418E_A5B3D42225F3"],"minWidth":20,"height":"100%","gap":10,"class":"Player","definitions": [{"items":[{"media":"this.panorama_069AF955_0B40_1C6F_419A_9960140EFEC1","camera":"this.panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_camera","class":"PanoramaPlayListItem","player":"this.MainViewerPanoramaPlayer","end":"this.trigger('tourEnded')"}],"id":"mainPlayList","class":"PlayList"},{"vfov":180,"overlays":["this.overlay_0647439B_0B43_EC1B_41A4_A6C41634A9DE","this.overlay_07899A60_0B40_1C25_4196_69C3B6187B72","this.overlay_07897DBC_0B40_341D_41A5_34A121AD87B2","this.overlay_0780C1F4_0B40_6C2D_418B_D6AAE253C460","this.overlay_053763C0_0BC0_6C65_417F_8B6BFB3A8B30"],"label":trans('panorama_069AF955_0B40_1C6F_419A_9960140EFEC1.label'),"hfovMax":130,"id":"panorama_069AF955_0B40_1C6F_419A_9960140EFEC1","data":{"label":"1"},"hfov":360,"partial":false,"class":"Panorama","thumbnailUrl":"media/panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_t.jpg","pitch":0,"frames":[{"class":"CubicPanoramaFrame","thumbnailUrl":"media/panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_t.jpg","cube":{"class":"ImageResource","levels":[{"url":"media/panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_0/{face}/0/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":21504,"colCount":42,"rowCount":7,"height":3584},{"url":"media/panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_0/{face}/1/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":12288,"colCount":24,"rowCount":4,"height":2048},{"url":"media/panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_0/{face}/2/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":6144,"colCount":12,"rowCount":2,"height":1024},{"url":"media/panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_0/{face}/3/{row}_{column}.jpg","tags":["ondemand","preload"],"class":"TiledImageResourceLevel","width":3072,"colCount":6,"rowCount":1,"height":512},{"url":"media/panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_0/{face}/vr/0.jpg","tags":"mobilevr","class":"TiledImageResourceLevel","width":9216,"colCount":6,"rowCount":1,"height":1536}]}}]},{"buttonCardboardView":"this.IconButton_1BB4389B_0BC0_3C1B_418E_A5B3D42225F3","gyroscopeVerticalDraggingEnabled":true,"displayPlaybackBar":true,"mouseControlMode":"drag_rotation","class":"PanoramaPlayer","gyroscopeEnabled":true,"viewerArea":"this.MainViewer","touchControlMode":"drag_rotation","id":"MainViewerPanoramaPlayer","arrowKeysAction":"translate"},{"id":"IconButton_1BB4389B_0BC0_3C1B_418E_A5B3D42225F3","iconURL":"skin/IconButton_1BB4389B_0BC0_3C1B_418E_A5B3D42225F3.png","propagateClick":false,"paddingTop":0,"width":56,"paddingLeft":0,"right":"3.14%","borderSize":0,"paddingBottom":0,"maxHeight":56,"maxWidth":56,"toolTipHorizontalAlign":"center","minHeight":1,"minWidth":1,"verticalAlign":"middle","shadow":false,"height":56,"backgroundOpacity":0,"class":"IconButton","bottom":"6.12%","mode":"push","transparencyActive":false,"horizontalAlign":"center","borderRadius":0,"data":{"name":"IconButton14318"},"cursor":"hand","paddingRight":0},{"playbackBarHeadShadowColor":"#000000","toolTipPaddingRight":6,"toolTipPaddingTop":4,"data":{"name":"Main Viewer"},"id":"MainViewer","toolTipFontStyle":"normal","toolTipShadowHorizontalLength":0,"playbackBarBorderSize":0,"playbackBarHeadBorderSize":0,"playbackBarHeadShadowVerticalLength":0,"progressBackgroundColorDirection":"vertical","subtitlesGap":0,"paddingTop":0,"toolTipShadowColor":"#333333","subtitlesBackgroundColor":"#000000","paddingLeft":0,"playbackBarHeadBackgroundColorRatios":[0,1],"borderSize":0,"paddingBottom":0,"toolTipDisplayTime":600,"transitionDuration":500,"subtitlesHorizontalAlign":"center","subtitlesVerticalAlign":"bottom","progressBarBackgroundColor":["#3399FF"],"subtitlesOpacity":1,"progressBorderColor":"#000000","playbackBarBackgroundOpacity":1,"toolTipHorizontalAlign":"center","progressBackgroundOpacity":1,"toolTipBorderColor":"#767676","playbackBarHeadOpacity":1,"vrPointerColor":"#FFFFFF","playbackBarOpacity":1,"doubleClickAction":"toggle_fullscreen","playbackBarHeadShadow":true,"toolTipFontWeight":"normal","playbackBarHeadBackgroundColor":["#111111","#666666"],"subtitlesTextShadowVerticalLength":1,"shadow":false,"toolTipTextShadowBlurRadius":3,"progressBarOpacity":1,"progressBackgroundColor":["#FFFFFF"],"progressBottom":0,"subtitlesTextShadowOpacity":1,"width":"100%","toolTipBorderRadius":3,"playbackBarBottom":5,"toolTipFontColor":"#606060","playbackBarProgressBackgroundColorDirection":"vertical","height":"100%","firstTransitionDuration":0,"subtitlesTop":0,"subtitlesBorderSize":0,"displayTooltipInTouchScreens":true,"subtitlesFontColor":"#FFFFFF","progressHeight":10,"playbackBarHeight":10,"playbackBarBackgroundColor":["#FFFFFF"],"playbackBarHeadBackgroundColorDirection":"vertical","toolTipBackgroundColor":"#F6F6F6","subtitlesFontWeight":"normal","playbackBarHeadWidth":6,"subtitlesTextShadowHorizontalLength":1,"toolTipShadowSpread":0,"playbackBarProgressBorderSize":0,"progressBorderSize":0,"subtitlesFontSize":"3vmin","toolTipPaddingBottom":4,"playbackBarBackgroundColorDirection":"vertical","progressBarBorderRadius":0,"subtitlesPaddingBottom":5,"playbackBarRight":0,"toolTipOpacity":1,"subtitlesPaddingLeft":5,"propagateClick":false,"subtitlesBottom":50,"toolTipShadowBlurRadius":3,"toolTipPaddingLeft":6,"transitionMode":"blending","progressBarBorderSize":0,"subtitlesBackgroundOpacity":0.2,"playbackBarProgressBackgroundColor":["#3399FF"],"subtitlesBorderColor":"#FFFFFF","playbackBarProgressBorderRadius":0,"vrPointerSelectionColor":"#FF6600","toolTipBorderSize":1,"paddingRight":0,"minHeight":50,"playbackBarHeadShadowOpacity":0.7,"subtitlesPaddingRight":5,"toolTipTextShadowColor":"#000000","progressBorderRadius":0,"subtitlesTextDecoration":"none","minWidth":100,"subtitlesTextShadowBlurRadius":0,"progressLeft":0,"playbackBarProgressBackgroundColorRatios":[0],"subtitlesFontFamily":"Arial","progressBackgroundColorRatios":[0],"playbackBarHeadShadowHorizontalLength":0,"class":"ViewerArea","toolTipFontSize":"1.11vmin","playbackBarBorderColor":"#FFFFFF","toolTipShadowVerticalLength":0,"progressRight":0,"playbackBarBorderRadius":0,"subtitlesTextShadowColor":"#000000","playbackBarHeadShadowBlurRadius":3,"subtitlesPaddingTop":5,"toolTipShadowOpacity":1,"playbackBarProgressBorderColor":"#000000","playbackBarHeadHeight":15,"progressOpacity":1,"vrPointerSelectionTime":2000,"playbackBarHeadBorderRadius":0,"borderRadius":0,"progressBarBorderColor":"#000000","playbackBarProgressOpacity":1,"playbackBarLeft":0,"toolTipFontFamily":"Arial","toolTipTextShadowOpacity":0,"progressBarBackgroundColorRatios":[0],"playbackBarHeadBorderColor":"#000000","progressBarBackgroundColorDirection":"vertical","subtitlesShadow":false},{"automaticZoomSpeed":10,"class":"PanoramaCamera","initialPosition":{"yaw":0,"class":"PanoramaCameraPosition","pitch":0},"initialSequence":"this.sequence_07D6456E_0B41_F43D_4196_201847375DE2","id":"panorama_069AF955_0B40_1C6F_419A_9960140EFEC1_camera"},{"rollOverDisplay":false,"class":"HotspotPanoramaOverlay","items":[{"vfov":24.11,"verticalAlign":"middle","scaleMode":"fit_inside","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"horizontalAlign":"center","hfov":33.7,"class":"HotspotPanoramaOverlayImage","image":"this.res_07DB5E72_0B41_F425_4199_4E23DA9912DE","pitch":-0.52,"yaw":148.47,"distance":50}],"enabledInCardboard":true,"useHandCursor":true,"areas":["this.HotspotPanoramaOverlayArea_063B839D_0B43_EC1F_4190_A8A7463C9984"],"id":"overlay_0647439B_0B43_EC1B_41A4_A6C41634A9DE","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"maps":[]},{"rollOverDisplay":false,"class":"HotspotPanoramaOverlay","items":[{"vfov":12.57,"verticalAlign":"middle","scaleMode":"fit_inside","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"horizontalAlign":"center","hfov":12.3,"class":"HotspotPanoramaOverlayImage","image":"this.res_07DA5E73_0B41_F42B_417B_531182BBDEFA","pitch":17.18,"yaw":56.32,"distance":50}],"enabledInCardboard":true,"useHandCursor":true,"areas":["this.HotspotPanoramaOverlayArea_078E2A60_0B40_1C25_4198_82DE892BAA27"],"id":"overlay_07899A60_0B40_1C25_4196_69C3B6187B72","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"maps":[]},{"rollOverDisplay":false,"class":"HotspotPanoramaOverlay","items":[{"vfov":8.39,"verticalAlign":"middle","scaleMode":"fit_inside","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"horizontalAlign":"center","hfov":6.81,"class":"HotspotPanoramaOverlayImage","image":"this.res_07DA5E73_0B41_F42B_417B_531182BBDEFA","pitch":10.82,"yaw":52.22,"distance":50}],"enabledInCardboard":true,"useHandCursor":true,"areas":["this.HotspotPanoramaOverlayArea_078E2DBD_0B40_341F_4191_D2F9935790AA"],"id":"overlay_07897DBC_0B40_341D_41A5_34A121AD87B2","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"maps":[]},{"rollOverDisplay":false,"class":"HotspotPanoramaOverlay","items":[{"vfov":5.7,"verticalAlign":"middle","scaleMode":"fit_inside","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"horizontalAlign":"center","hfov":5,"class":"HotspotPanoramaOverlayImage","image":"this.res_07DA5E73_0B41_F42B_417B_531182BBDEFA","pitch":21.59,"yaw":115.49,"distance":50}],"enabledInCardboard":true,"useHandCursor":true,"areas":["this.HotspotPanoramaOverlayArea_078171F5_0B40_6C2F_4192_CA376CE7CEF8"],"id":"overlay_0780C1F4_0B40_6C2D_418B_D6AAE253C460","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"maps":[]},{"rollOverDisplay":false,"class":"HotspotPanoramaOverlay","items":[{"vfov":12.02,"verticalAlign":"middle","scaleMode":"fit_inside","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"horizontalAlign":"center","hfov":30.41,"class":"HotspotPanoramaOverlayImage","image":"this.res_049CD3A1_0BC1_EC27_41A5_37E307F17836","pitch":5.02,"yaw":86.17,"distance":50}],"enabledInCardboard":true,"useHandCursor":true,"areas":["this.HotspotPanoramaOverlayArea_06D503E4_0BC0_6C2D_41A5_D99506406FEC"],"id":"overlay_053763C0_0BC0_6C65_417F_8B6BFB3A8B30","data":{"label":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},"maps":[]},{"id":"sequence_07D6456E_0B41_F43D_4196_201847375DE2","movements":[{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","easing":"cubic_in","yawDelta":18.5},{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","easing":"linear","yawDelta":323},{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","easing":"cubic_out","yawDelta":18.5}],"restartMovementOnUserInteraction":false,"class":"PanoramaCameraSequence"},{"levels":[{"url":"media/res_07DB5E72_0B41_F425_4199_4E23DA9912DE_0.png","width":936,"class":"ImageResourceLevel","height":562}],"id":"res_07DB5E72_0B41_F425_4199_4E23DA9912DE","class":"ImageResource"},{"mapColor":"any","id":"HotspotPanoramaOverlayArea_063B839D_0B43_EC1F_4190_A8A7463C9984","class":"HotspotPanoramaOverlayArea"},{"levels":[{"url":"media/res_07DA5E73_0B41_F42B_417B_531182BBDEFA_0.png","width":358,"class":"ImageResourceLevel","height":358}],"id":"res_07DA5E73_0B41_F42B_417B_531182BBDEFA","class":"ImageResource"},{"mapColor":"any","id":"HotspotPanoramaOverlayArea_078E2A60_0B40_1C25_4198_82DE892BAA27","class":"HotspotPanoramaOverlayArea"},{"mapColor":"any","id":"HotspotPanoramaOverlayArea_078E2DBD_0B40_341F_4191_D2F9935790AA","class":"HotspotPanoramaOverlayArea"},{"mapColor":"any","id":"HotspotPanoramaOverlayArea_078171F5_0B40_6C2F_4192_CA376CE7CEF8","class":"HotspotPanoramaOverlayArea"},{"levels":[{"url":"media/res_049CD3A1_0BC1_EC27_41A5_37E307F17836_0.png","width":848,"class":"ImageResourceLevel","height":284}],"id":"res_049CD3A1_0BC1_EC27_41A5_37E307F17836","class":"ImageResource"},{"mapColor":"any","id":"HotspotPanoramaOverlayArea_06D503E4_0BC0_6C2D_41A5_D99506406FEC","class":"HotspotPanoramaOverlayArea"}],"scrollBarWidth":10,"scrollBarVisible":"rollOver","scripts":{"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"getKey":TDV.Tour.Script.getKey,"mixObject":TDV.Tour.Script.mixObject,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"resumePlayers":TDV.Tour.Script.resumePlayers,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"initGA":TDV.Tour.Script.initGA,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"shareSocial":TDV.Tour.Script.shareSocial,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getPixels":TDV.Tour.Script.getPixels,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"showPopupImage":TDV.Tour.Script.showPopupImage,"init":TDV.Tour.Script.init,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"quizShowScore":TDV.Tour.Script.quizShowScore,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"getMediaByName":TDV.Tour.Script.getMediaByName,"getComponentByName":TDV.Tour.Script.getComponentByName,"setValue":TDV.Tour.Script.setValue,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"setLocale":TDV.Tour.Script.setLocale,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"existsKey":TDV.Tour.Script.existsKey,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"quizStart":TDV.Tour.Script.quizStart,"historyGoBack":TDV.Tour.Script.historyGoBack,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"quizFinish":TDV.Tour.Script.quizFinish,"translate":TDV.Tour.Script.translate,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"initQuiz":TDV.Tour.Script.initQuiz,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"setMapLocation":TDV.Tour.Script.setMapLocation,"showWindow":TDV.Tour.Script.showWindow,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"unregisterKey":TDV.Tour.Script.unregisterKey,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"registerKey":TDV.Tour.Script.registerKey,"getOverlays":TDV.Tour.Script.getOverlays,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"playAudioList":TDV.Tour.Script.playAudioList,"cloneCamera":TDV.Tour.Script.cloneCamera,"openLink":TDV.Tour.Script.openLink,"historyGoForward":TDV.Tour.Script.historyGoForward},"overflow":"hidden","horizontalAlign":"left","vrPolyfillScale":0.75,"borderRadius":0,"mouseWheelEnabled":true,"data":{"name":"Player573","locales":{"ru":"locale/ru.txt"},"defaultLocale":"ru"},"backgroundPreloadEnabled":true,"paddingRight":0};
    if (d['data'] == undefined)
        d['data'] = {};
    d['data']['translateObjs'] = c;
    d['data']['history'] = {};
    d['scripts']['createQuizConfig'] = createQuizConfig;
    TDV['PlayerAPI']['defineScript'](d);
}());
//# sourceMappingURL=http://localhost:9000/script_device_v2020.3.9.js.map
//Generated with v2020.3.9, Thu Aug 20 2020