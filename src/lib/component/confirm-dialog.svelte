<script type="text/javascript">
  import "@material/web/dialog/dialog"
  import "@material/web/button/text-button"
  import "@material/web/button/filled-button"

  export let me = null;
  export let username = "";
  // let message = "";
  export async function showDialog(message_){
    message = message_;
    if(me){
      me.show();
    }
  }

  // me.onclose
</script>

<md-dialog bind:this={me} style="max-width: 320px;">
  <form method="dialog" slot="content" id="form" class="text-center text-lg">
    <b>{username}</b> want to join room
  </form>
  <div slot="actions" class="flex justify-center items-center flex-wrap">
    <button form="form" value="confirm" class="p-2 border-1 border-blue-900 bg-indigo-100 text-indigo-900 poppins rounded-lg outline-none font-bold">Confirm</button>
    <button form="form" value="deny" class="p-2 border-1 border-red-500 bg-red-100 text-red-900 poppins rounded-lg outline-none font-bold">Deny</button>
  </div>
</md-dialog>