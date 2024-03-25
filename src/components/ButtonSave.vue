<template>
  <div class="container pt-4 pb-4">
    <button @click="saveChanges" class="btn btn-primary">
      Save Changes
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  methods: {
    saveChanges() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName
        })
      };

      fetch(`/api/cards/${this.id}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
          }
          console.log('Изменения сохранены');
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    }
  }
}
</script>
