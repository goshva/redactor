<template>

  <ul class="arr-list"> 
    <li class="arr-item">
        <input type="text" class="inp" placeholder="id">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="entityId">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="template">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="hide">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="name">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="alt">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="url">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="seo_title">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="seo_keys">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="seo_desc">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="title">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="type">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="datatime">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="image">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="desc">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="text">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="sort">
    </li>
    <li class="arr-item">
        <input type="text" class="inp" placeholder="last_updated">
    </li>
  </ul>
  <div class="key">
    <button class="btn-save">💾</button>
  </div>
</template>

<script>

</script>

<style scoped>
  ul {
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
  }

  .arr-list {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    border-radius: 20px;
    gap: 20px;
    padding: 20px;
    width: 100%;
    background: linear-gradient(135deg, rgba(66, 181, 255, 0.85) 0%, rgba(161, 59, 133, 0.85) 100%);
  }

  .arr-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }

  .inp {
    border: 1px solid rgba(66, 181, 255, 0.85);
    display: block;
    padding: 10px 30px;
    min-width: 100%;
    height: 50px;
    border-radius: 20px;
  }


  .key {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    height: 100%;
    width: 100%;
    text-wrap: wrap;
    background: linear-gradient(135deg, rgba(161, 59, 133, 0.85) 0%, rgba(66, 181, 255, 0.85) 100%);
    border-radius: 20px;
  }


  .btn-save {
    background-color: transparent;
    border: unset;
    font-size: 40px;
  }
</style>
