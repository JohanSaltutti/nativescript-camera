<template>
	<Page class="page">
		<ActionBar title="Camera" class="action-bar" />
        <FlexboxLayout flexDirection="column">

            <Button :text="textPicture" class="btn btn-primary" marginTop="20" @tap="takePicture"></Button>

            <Image id="picture" :src="pictureFromCamera" flexShrink="1" @tap="detail"></Image>

            <Button v-if="!showFilters" text="Ajouter un filtre" class="btn btn-primary" marginTop="20" @tap="showFiltersList"></Button>


            <ScrollView v-if="showFilters" orientation="horizontal" marginTop="10">
                <StackLayout orientation="horizontal">
                    <Image v-for="(filter,index) in filters" :key="index" 
                        :id="filter" 
                        :src="pictures[filter]" 
                        height="200" 
                        @tap="applyFilter(filter)"
                        marginRight="5">
                    </Image>
                </StackLayout>
            </ScrollView>

            <Button v-if="pictureFromCamera != null" text="Sauvergarder" class="btn btn-primary" marginTop="20"></Button>
        
        </FlexboxLayout>
	</Page>
</template>

<script>
import { topmost } from 'tns-core-modules/ui/frame';
import * as camera from "../nativescript-camera";
import * as http from "http";
import { ImageFilters } from 'nativescript-image-filters';



const imageFilters  = new ImageFilters();



export default {
    data() {
        return {
            pictureFromCamera : null,
            pictureAsset      : null,
            pictures          : {},
            showFilters       : false,
            textPicture       : "Prendre une photo",
            filters           : ['reset', 'blackAndWhite', 'sepia', 'invert', 'emboss']
        };
    },
    methods: {
        takePicture() {
            camera
                .takePicture({ width: 300, height: 300, keepAspectRatio: true })
                .then(imageAsset => {
                    this.pictureAsset      = imageAsset;
                    this.pictureFromCamera = imageAsset;
                });
        },

        showFiltersList(){
            const img = topmost().getViewById('picture');

            this.filters.forEach(filter => {
                switch(filter){
                    case 'reset' :
                        this.pictures[filter] = this.pictureFromCamera;
                        break;
                    case 'sepia' :
                        imageFilters.sepiaEffect(img, 1, 0.8, 0.5, 0.12).then(result => {
                            this.pictures[filter] = result;
                        });
                        break;
                    default:
                        imageFilters[filter](img).then(result => {
                            this.pictures[filter] = result;
                        });
                        break;
                }

            });

            this.showFilters = true;
        },

        applyFilter(filterName){
            const img = topmost().getViewById('picture'); 

            if(filterName == "reset")
                this.pictureFromCamera = this.pictureAsset;
            else
                img.imageSource = this.pictures[filterName];
        }
    }
};
</script>
