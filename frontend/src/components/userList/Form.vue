<template>
    <form
        class="form"
        @submit.prevent
        novalidate="true"
    >
        <div class="image-upload">
            <div class="image-wrapper">
                <img class="place-image" :src="imagePreview || imageStub">
            </div>
            <div class="field">
                <div class="file is-primary">
                    <label class="file-label width100">
                        <input
                            @change="previewImage"
                            class="file-input"
                            type="file"
                            name="photo"
                        >
                        <span class="file-cta width100">
                            <span class="file-icon">
                                <i class="fas fa-upload" />
                            </span>
                            <span class="file-label">
                                {{ $t('user_lists_page.add_place.buttons.load_cover') }}
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div class="field">
                <a class="button is-danger is-fullwidth" @click="deleteImg">
                    <b-icon icon="delete" />
                    <span>{{ $t('user_lists_page.add_place.buttons.delete_image') }}</span>
                </a>
            </div>
        </div>
        <div class="list-name width100">
            <b-field label="List name">
                <b-input
                    v-model="userList.name"
                    placeholder="Name"
                    id="list-name"
                    :disabled="isDefault"
                />
            </b-field>
            <div class="form-actions">
                <button v-if="id" class="button is-info" @click="onUpdate">
                    {{ $t('user_lists_page.add_place.buttons.update') }}
                </button>
                <button
                    v-if="id"
                    class="button is-danger"
                    @click="onDelete"
                    :disabled="isDefault"
                >
                    {{ $t('user_lists_page.add_place.buttons.delete') }}
                </button>
                <button v-else class="button is-success" @click="onAdd">
                    {{ $t('user_lists_page.add_place.buttons.save') }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import imageStub from '@/assets/no-photo.png';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    name: 'Form',
    props: {
        attachedPlaces: {
            type: Array,
            required: true
        },
        id: {
            type: Number,
            default: null
        },
        listName: {
            type: String,
            default: null
        },
        listImage: {
            type: String,
            default: null
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            userList: {
                name: this.$props.listName,
                image: null
            },
            imageStub: imageStub,
            imagePreview: this.$props.listImage,
            availableImageSize: 5000000,
            availableImageTypes: [
                'image/jpeg',
                'image/jpg',
                'image/png'
            ]
        };
    },
    methods: {
        ...mapActions('userList', {
            add: 'addUserList',
            update: 'updateUserList',
            delete: 'deleteUserList',
            deleteUserListImg: 'deleteUserListImg'
        }),
        onAdd () {
            this.$emit('loading', true);
            if (this.$v.userList.$invalid) {
                this.onError(this.$t('user_list_form.messages.name_required'));
                this.$emit('loading', false);
                return;
            }

            this.add({
                userList: this.userList,
                attachedPlaces: this.attachedPlaces
            })
                .then(() => {
                    this.$emit('loading', false);
                    this.onSuccess(this.$t('user_list_form.messages.saved'));
                    this.$router.push({ name: 'UserListsPage' });
                })
                .catch((err) => {
                    this.$emit('loading', false);
                    this.onError(err.response.data.message);
                });
        },
        onUpdate () {
            this.$emit('loading', true);
            this.update({
                userList: this.userList,
                attachedPlaces: this.attachedPlaces,
                id: this.id
            })
                .then(() => {
                    this.$emit('loading', false);
                    this.onSuccess(this.$t('user_list_form.messages.updated'));
                    this.$router.push({ name: 'UserListsPage' });
                })
                .catch((err) => {
                    this.$emit('loading', false);
                    this.onError(err.response.data.message);
                });
        },
        onDelete() {
            this.$emit('loading', true);
            this.delete(this.id)
                .then(() => {
                    this.$emit('loading', false);
                    this.onSuccess(this.$t('user_list_form.messages.deleted'));
                    this.$router.push({ name: 'UserListsPage' });
                });
        },
        onError (message = 'Error occurred') {
            this.$toast.open({
                message: message,
                type: 'is-danger'
            });
        },
        onSuccess (message) {
            this.$toast.open({
                message: message,
                type: 'is-success'
            });
        },
        previewImage: function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            this.userList.image = null;
            if (file) {
                reader.onload = (e) => {
                    if (this.checkFileType(file.type) && this.checkFileSize(file.size)) {
                        this.imagePreview = e.target.result;
                        this.userList.image = file;
                    }
                };

                reader.readAsDataURL(file);
            }
        },
        checkFileType(fileType) {
            if (!this.availableImageTypes.includes(fileType)) {
                this.onError(this.$t('user_list_form.messages.wrong_image_type'));
                return false;
            }

            return true;
        },
        checkFileSize(fileSize) {
            if (this.availableImageSize < fileSize) {
                this.onError(this.$t('user_list_form.messages.big_photo') + ' 5mb');
                return false;
            }

            return true;
        },
        deleteImg() {
            if (this.id && this.imagePreview) {
                this.deleteUserListImg(this.id)
                    .then(() => {
                        this.imagePreview = null;
                        this.userList.image = null;
                    });
            }
        },
    },
    validations: {
        userList: {
            name: {
                required,
            },
            image: {
            },
        }
    }
};
</script>

<style scoped lang="scss">
    .form {
        grid-area: form;
        display: flex;
        align-items: center;
        position: sticky;
        padding: 20px;
        top: 50px;
        z-index: 2;
        background-color: #fff;
    }

    .form-actions {
        text-align: center;
    }
    
    .width100 {
        width: 100%;
    }

    .image-upload {
        width: 200px;
    }

    .image-wrapper {
        flex-shrink: 0;
        width: 200px;
        height: 128px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .place-image {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }

    .list-name {
        margin-left: 30px;
    }

    .text {
        font-size: 2rem;
        font-weight: bold;
        line-height: 120%;
        padding: 6px 7px 5px 5px;
        transition-duration: .33s;
        transition-property: background, border, color, opacity, box-shadow;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        color: #4e595d;
        letter-spacing: 0;
        -webkit-font-smoothing: antialiased;
        background: #fff;
        border: 1px solid #c7cdcf;
        outline: none;
        margin: 0 0 10px 0;
        width: 100%;
    }

    @media screen and (max-width: 769px) {
        .form {
            position: relative;
            top: 0;
        }
    }

    @media screen and (max-width: 520px) {
        .form {
            flex-direction: column;
            align-items: center;

            .photo-section {
                margin: 0 0 20px 0;
            }
        }
    }
</style>