import { toFixed } from 'common/math';
import { Fragment } from 'inferno';
import { Button, Flex, Slider, Knob } from 'tgui/components';
import { useDispatch, useSelector } from 'tgui/store';
import { useSettings } from '../settings';
import { selectAudio } from './selectors';

export const NowPlayingWidget = (props, context) => {
  const audio = useSelector(context, selectAudio);
  const dispatch = useDispatch(context);
  const settings = useSettings(context);
  const title = audio.meta?.title;
  return (
    <Flex mx={-0.5} align="center">
      {audio.playing && (
        <Fragment>
          <Flex.Item
            shrink={0}
            mx={0.5}
            color="label">
            Now playing:
          </Flex.Item>
          <Flex.Item
            mx={0.5}
            grow={1}
            style={{
              'white-space': 'nowrap',
              'overflow': 'hidden',
              'text-overflow': 'ellipsis',
            }}>
            {title || 'Unknown Track'}
          </Flex.Item>
        </Fragment>
      ) || (
        <Flex.Item grow={1} color="label">
          Nothing to play.
        </Flex.Item>
      )}
      {audio.playing && (
        <Flex.Item mx={0.5} fontSize="0.9em">
          <Button
            tooltip="Stop"
            icon="stop"
            onClick={() => dispatch({
              type: 'audio/stopMusic',
            })} />
        </Flex.Item>
      )}
      <Flex.Item mx={0.5} fontSize="0.9em">
        <Knob
          minValue={0}
          maxValue={1}
          value={settings.adminMusicVolume}
          step={0.0025}
          stepPixelSize={1}
          format={value => toFixed(value * 100) + '%'}
          onDrag={(e, value) => settings.update({
            adminMusicVolume: value,
          })} />
      </Flex.Item>
    </Flex>
  );
};
