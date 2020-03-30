
// const { width, height } = Dimensions.get('window');
// const toRadians = angle => angle * (Math.PI / 180);
// const rotatedWidth = width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

// function runSpring(clock, value, dest, config, state) {
//     return [
//       cond(clockRunning(clock), 0, [
//         set(state.finished, 0),
//         set(state.velocity, 0),
//         set(state.position, value),
//         set(config.toValue, dest),
//         startClock(clock),
//       ]),
//       spring(clock, state, config),
//       cond(state.finished, stopClock(clock)),
//       state.position,
//     ];
// };

// const Cards = ({ profiles, onScroll, onScrollBeginDrag }) => {
//     const [current, setCurrent] = useState(0);

//     let {
// 		onGestureEvent,
// 		translateX
// 	 } = useMemo(() => {
//         const translationX = new Value(0);
//         const velocityX = new Value(0);
//         const clock = new Clock();
//         const state = {
//             finished: new Value(0),
//             velocity: new Value(0),
//             position: new Value(0),
//             time: new Value(0)
//         };
//         const gestureState = new Value(State.UNDETERMINED);

//         const onGestureEvent = event(
//             [
//               {
//                 nativeEvent: {
//                   translationX,
//                   velocityX,
//                   state: gestureState,
//                 },
//               },
//             ],
//             { useNativeDriver: true },
//         );

//         const swipe = () => {
//             setCurrent(current + 1)
//         };

//         const finalTranslateX = add(translationX, multiply(0.2, velocityX));
//         const translationThreshold = width / 4;
//         const snapPoint = cond(
//             lessThan(finalTranslateX, -translationThreshold),
//             -rotatedWidth,
//             cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
//         );
//         const translateX = block([
//             startClock(clock),
//             cond(
//                 eq(gestureState, State.END), 
//                 [
//                     spring(clock, state, { ...SpringUtils.makeDefaultConfig(), toValue: snapPoint }),
//                     cond(and(state.finished, greaterThan(state.position, width)),
//                         call([translationX], () => swipe())
//                     )
//                 ],
//                 set(state.position, translationX)
//             ),
//             state.position
//         ]);

//         // const rotate = translationX.interpolate({
//         //     inputRange: [-width / 2, 0, height / 2],
//         //     outputRange: ['-10deg', '0deg', '10deg'],
//         //     extrapolate: 'clamp'
//         // });

//         const likeOpacity = translationX.interpolate({
//             inputRange: [-height / 2, 0, width / 3],
//             outputRange: [0, 0, 1],
//             extrapolate: 'clamp'
//         });
//         const dislikeOpacity = translationX.interpolate({
//             inputRange: [-height / 2, 0, width / 3],
//             outputRange: [1, 0, 0],
//             extrapolate: 'clamp'
//         });
//         // const opacity = translationX.interpolate({
//         //     inputRange: [-height / 2, 0, width],
//         //     outputRange: [1, 0, 1],
//         //     extrapolate: 'clamp'
//         // });
//         // const scale = translationX.interpolate({
//         //     inputRange: [-height / 2, 0, width],
//         //     outputRange: [1, 0.8, 1],
//         //     extrapolate: 'clamp'
//         // });

// 		const first = {
// 			...StyleSheet.absoluteFill,
// 			transform: [
//                 // { rotate },
//                 { translateX }
//             ],
// 			zIndex: 1
// 		};
// 		const second = {
// 			// opacity,
// 			...StyleSheet.absoluteFill,
// 			// transform: [{ scale }],
// 			zIndex: 0
//         };

// 		return {
// 			onGestureEvent,
// 			translateX
//         }
//     }, [current]);

//     const cards = (profile, index) => {
//         if (index === current) {
//             return (
//                 <PanGestureHandler
//                     onHandlerStateChange={onGestureEvent}
//                     {...{ onGestureEvent }}>
//                     <Animated.View style={first}>
//                         <Card
//                             onScroll={onScroll}
//                             onScrollBeginDrag={onScrollBeginDrag}
//                             profile={profile} 
//                         />
//                     </Animated.View>
//                 </PanGestureHandler>
//             )
//         } else if (index === current + 1) {
//             return (
//                 <Card profile={profile} />
//             )
//         }
//     }

//     return (
//         <PanGestureHandler
//             onHandlerStateChange={onGestureEvent}
//             {...{ onGestureEvent }}>
//                 {
//                     profiles.map((profile, index) => {
//                         if(current === index) {
//                             return (
//                                 <Animated.View
//                                     style={{
//                                         transform: [
//                                             {translateX}
//                                         ]
//                                     }}>
//                                     <Card
//                                         onScroll={onScroll}
//                                         onScrollBeginDrag={onScrollBeginDrag}
//                                         profile={profile} 
//                                     />
//                                 </Animated.View>
//                             )
//                         }
//                     })
//                 }
//         </PanGestureHandler>
//     );
// };

// export default Cards;


import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, Platform } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  PanGestureHandler,
  State,
  TapGestureHandler
} from "react-native-gesture-handler";
import { useMemoOne } from "use-memo-one";
import Card from './Card.js';

const {
  timing,
  eq,
  neq,
  block,
  Value,
  cond,
  set,
  event,
  add,
  and,
  clockRunning,
  not,
  startClock,
  stopClock,
  Clock,
  debug,
  decay,
  call,
  sub,
  spring,
  diffClamp,
  greaterOrEq,
  lessOrEq,
  greaterThan,
  lessThan,
  multiply,
  concat,
  abs,
  or
} = Animated;

const Cards = ({ profiles: allProfiles, onScroll, onScrollBeginDrag }) => {
  const [profiles, setProfiles] = useState(allProfiles);
  const [currentIndex, setCurrentIndex] = useState(allProfiles.length - 1);
  const {gestureState, cardTransX, cardTransY, cardVelX, tapState, scaleVal, onLike, onDislike} = useMemoOne(() => ({
    gestureState : new Value(State.UNDETERMINED),
    cardTransX : new Value(0),
    cardTransY : new Value(0),
    cardVelX : new Value(0),
    tapState : new Value(State.UNDETERMINED),
    scaleVal : new Value(1),
    onLike : new Value(0),
    onDislike : new Value(0)
  }), [])

  // HANDLE PAN EVENT HERE
  const handlePan = event([
    {
      nativeEvent: ({ state, translationX, translationY, velocityX }) =>
        block([
          set(gestureState, state),
          set(cardTransX, translationX),
          set(cardTransY, translationY),
          set(cardVelX, velocityX)
        ])
    }
  ]);

  const withSpringX = (
    gestureState,
    value,
    vel
  ) => {
    const clock = new Clock();
    const offset = new Value(0);
    const state = {
      finished: new Value(0),
      position: new Value(0),
      velocity: new Value(0),
      time: new Value(0)
    };
    const config = {
      stiffness: new Value(100),
      mass: new Value(1),
      damping: new Value(10),
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: new Value(0)
    };

    return block([
		cond(and(clockRunning(clock), eq(gestureState, State.BEGAN)), [
			debug("CATCHED ON START...", stopClock(clock))
		]),
		cond(neq(gestureState, State.END), [
			set(state.finished, 0),
			set(state.position, add(offset, value))
		]),
		cond(eq(gestureState, State.END), [
			cond(greaterThan(vel, 100), [
			cond(and(not(clockRunning(clock)), not(state.finished)), [
				set(state.time, 0),
				set(state.velocity, 0),
				set(config.toValue, 500),
				call([], () => setCurrentIndex(curr => curr - 1)),
				startClock(clock)
			]),
			spring(clock, state, config),
			set(offset, state.position),
			cond(state.finished, [
				stopClock(clock),
			])
			]),
			cond(lessOrEq(vel, -100), [
			cond(and(not(clockRunning(clock)), not(state.finished)), [
				set(state.time, 0),
				set(config.toValue, -500),
				set(state.velocity, 0),
				call([], () => setCurrentIndex(curr => curr - 1 )),
				startClock(clock)
			]),
			spring(clock, state, config),
			set(offset, state.position),
			cond(state.finished, [
				stopClock(clock)
			])
			]),
			cond(lessOrEq(abs(vel), 100), [
			cond(and(not(clockRunning(clock)), not(state.finished)), [
				debug("STATE : ", gestureState),
				set(state.time, 0),
				set(state.velocity, vel),
				// TO VALUE IS 0 FOR BOTH
				set(config.toValue, 0),
				debug("START CLOCK", startClock(clock))
			]),
			spring(clock, state, config),
			set(offset, state.position),
			cond(state.finished, [
				debug("STOP CLOCK", stopClock(clock)),
			])

		])

	]),
	state.position
    ]);
  };

  const translateX = withSpringX(gestureState, cardTransX, cardVelX);
  const generateColor = () => '#' +  Math.random().toString(16).substr(-6);

  const rotate = Animated.interpolate(translateX, {
    inputRange: [-100, 100],
    outputRange: [-6, 6]
  });
  return (
    <View style={{
		justifyContent: "center",
		alignItems: "center",
		flex: 1, }}
	>
        {profiles.map((profile, index) => {
          if (index > currentIndex) {
            return null
          };

          if (index === currentIndex) {
            return (
				<React.Fragment key={profile.id}>
					<PanGestureHandler
						onGestureEvent={handlePan}
						onHandlerStateChange={handlePan} 
					>
						<Animated.View
							style={{	
								...StyleSheet.absoluteFillObject,
								transform: [
									{ translateX },
									{ rotate: concat(rotate, "deg") }
								]
							}} 
						>
							<Card
								onScroll={onScroll}
								onScrollBeginDrag={onScrollBeginDrag}
								profile={profile} 
							/>
						</Animated.View>
					</PanGestureHandler>
				</React.Fragment>
            ) 
          } else {

            return (
              	<React.Fragment key={profile.id}>
					<Animated.View style={{ ...StyleSheet.absoluteFillObject }} >
						<Card profile={profile}	/>
                	</Animated.View>
              	</React.Fragment>
            )
          }

        })}
      {/* <View style={{ ...styles.footer }}>

        <TapGestureHandler onHandlerStateChange={ }>
          <Animated.View style={{ ...styles.likeButton }}>
            <EvilIcons name="heart" size={50} color="#66bb6a" />
          </Animated.View>
        </TapGestureHandler>

        <TapGestureHandler onHandlerStateChange={handleTapDislike}>
          <Animated.View style={{ ...styles.dislikeButton }}>
            <EvilIcons name="close" size={50} color="#e53935" />
          </Animated.View>
        </TapGestureHandler>
      </View> */}
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
	
});

Cards.navigationOptions = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: '#fff',
    }
});