import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Reel, EDL} from './Reel';
import {Explainer16x9} from './Explainer16x9';
import {Explainer16x9Light} from './Explainer16x9Light';
import {BucketWealthLight} from './BucketWealthLight';
import sample from '../edl.example.json';

const Root: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Reel as any}
      fps={30}
      width={1080}
      height={1920}
      durationInFrames={300}
      defaultProps={sample as unknown as EDL}
      calculateMetadata={({props}) => ({durationInFrames: Math.round((props as unknown as EDL).duration * 30)})}
    />
    <Composition
      id="Explainer16x9"
      component={Explainer16x9}
      fps={30}
      width={1920}
      height={1080}
      durationInFrames={7513}
    />
    <Composition
      id="Explainer16x9Light"
      component={Explainer16x9Light}
      fps={30}
      width={1920}
      height={1080}
      durationInFrames={7513}
    />
    <Composition
      id="BucketWealthLight"
      component={BucketWealthLight}
      fps={30}
      width={1920}
      height={1080}
      durationInFrames={6183}
    />
  </>
);
registerRoot(Root);
