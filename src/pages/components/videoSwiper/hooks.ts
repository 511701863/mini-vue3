import { ComponentInternalInstance, readonly, ref } from 'vue';

// 单击暂停/播放
export function useClickPause(instance: ComponentInternalInstance){
    const isPlay = ref(true);

    function reset(videoId: string){
        console.log(isPlay.value);
        const videoContext = uni.createVideoContext(videoId, instance);
        videoContext.play();
        isPlay.value = true;
    }

    function toggle(videoId: string){
        const videoContext = uni.createVideoContext(videoId, instance);
        if(isPlay.value){
          videoContext.pause();
          isPlay.value = false;
        }else{
          videoContext.play();
          isPlay.value = true;
        }
    }

    return readonly({
        isPlay,
        reset,
        toggle
    });
}
