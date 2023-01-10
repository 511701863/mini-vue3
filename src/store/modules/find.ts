import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
interface findProps {
  topicList:{
    name:string,
    id:string
  }[],
  clubList: {
    name:string,
    id:string
  }[],
  topicIdList:string[],
  clubIdList:string[],
  address:any,
  city:any
}
export const useFind = defineStore('find', () => {
  const store = reactive<findProps>({
    topicList: [],
    clubList: [],
    topicIdList:[],
    clubIdList:[],
    address:{},
    city:{}
  });
  function pushTopic(topic:any) {
    if(store.topicIdList.indexOf(topic.id)===-1){
      store.topicList.push(topic);
      store.topicIdList.push(topic.id);
    }

  }
  function pushClub(club: any) {
    if(store.clubIdList.indexOf(club.id)===-1){
      store.clubList.push(club);
      store.clubIdList.push(club.id);
    }

  }
  function pushCity(city:any){
    store.city=city;
  }
  function deleteTopic(topicId:string){
    store.topicList=store.topicList.filter((item) => item.id!==topicId);
    store.topicIdList=store.topicIdList.filter((item) => item!==topicId);
  }
  function deleteClub(clubId:string){
    store.clubList=store.clubList.filter((item) => item.id!==clubId);
    store.clubIdList=store.clubIdList.filter((item) => item!==clubId);
  }
  function reset() {
    store.clubList = [];
    store.clubIdList=[];
    store.topicList = [];
    store.topicIdList=[];
  }
  function addressPush(address:any){
    store.address=address;
  }
  function resrtCity(){
    store.city={};
  }
  return {
    ...toRefs(store),
    pushTopic,
    pushClub,
    deleteClub,
    deleteTopic,
    addressPush,
    reset,
    pushCity,
    resrtCity

  };
});
