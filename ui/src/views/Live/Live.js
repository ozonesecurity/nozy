import React, { Component, PropTypes } from 'react';
import { Player } from 'video-react';
import Hls from 'hls.js';

const propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
  video: PropTypes.object,
};

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls();
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    const { src, video } = this.props;
    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }

}

HLSSource.propTypes = propTypes;

const VideoMP4 = () => {
    return(
      <Player
        playsInline
        autoPlay
        poster="/assets/poster.png"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    );
}

const VideoHLS = () => {
    return(
      <Player>
        <HLSSource
          isVideoChild
          src="//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
        />
      </Player>
    );
}

const VideoOGV = () => {
    return(
      <Player
        playsInline
        autoPlay
        src="http://media.w3.org/2010/05/bunny/movie.ogv"
      />
    );
}

const VideoWEBM = () => {
    return(
      <Player
        playsInline
        autoPlay
        src="http://media.w3.org/2010/05/video/movie_300.webm"
      />
    );
}

export class LiveMulti extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col">
            <VideoMP4/>
          </div>
          <div className="col">
            <VideoHLS/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <VideoOGV/>
          </div>
          <div className="col">
            <VideoWEBM/>
          </div>
        </div>
      </div>
    )
  }
}

export class LiveSingle extends Component {
  constructor( props ) {
    super(props);
    this.feedId = this.props.params.feedId;
  }
  render() {
    return (
      <div className="animated fadeIn">
      {this.feedId === "mp4" &&
        <VideoMP4/>
	  }
      {this.feedId === "hls" &&
        <VideoHLS/>
      }
      {this.feedId === "ogv" &&
        <VideoOGV/>
      }
      {this.feedId === "webm" &&
        <VideoWEBM/>
      }
      </div>
    )
  }
}
