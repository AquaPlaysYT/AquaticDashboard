<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<iframe style="display: none" name="dummyframe" id="dummyframe"></iframe>

<div class="panel panel-default">
  	<div class="panel-heading"><B>Discord Bot Login</B></div>
		<div class="panel-body">

                <label>Welcome To Aquatics Bot Dashboard!</label>

                <div class="form-group"></div>

                <label>If You Want To Use Discord Intergration Please Login To Your Bot Account!</label>

                <div class="form-group"></div>

                <form action="/SendDiscordLogin" method="POST" target="dummyframe" >
                     <input type="hidden" name="token" value="{{ token }}" />
                    <input type="text" name="text" placeholder="Discord Token">
                    <input type="submit" name="login" class="btn btn-info" value="Login" />
                </form>

                <div class="form-group"></div>

                <div class="form-group"></div>

                <label>Please User !setup in discord for help!</label>

                <div class="form-group"></div>

                <label>Please Login Before Using Anything!</label>

                <div class="form-group"></div>


		</div>
	</div>
</div>

<div class="panel panel-default">
  	<div class="panel-heading"><B>Fortnite Login</B></div>
		<div class="panel-body">

                <form action="/SendLogin" method="POST" target="dummyframe" >
                    <input type="hidden" name="token" value="{{ token }}" />
                    <input type="text" name="username" placeholder="Email">
                    <input type="text" name="password" placeholder="Password">
                    <input type="text" name="netcl" placeholder="NetCL (Must Use!)">
                    <input type="submit" name="login" class="btn btn-info" value="Login" />
                </form>

                <div class="form-group"></div>
		</div>
	</div>
</div>

<div class="panel panel-default">
  	<div class="panel-heading"><B>Cosmetics</B></div>
		<div class="panel-body">

            <div class="form-group"></div>

            <form action="/SendSkin" method="POST" target="dummyframe" >
               <input type="hidden" name="token" value="{{ token }}" />
               <input type="text" name="text" placeholder="Skin Cid">
               <input type="submit" name="login" class="btn btn-info" value="Set" />
            </form>

            <form action="/SendEmote" method="POST" target="dummyframe" >
                <input type="hidden" name="token" value="{{ token }}" />
               <input type="text" name="text" placeholder="Emote EID">
               <input type="submit" name="login" class="btn btn-info" value="Set" />
            </form>

            <form action="/SendBackbling" method="POST" target="dummyframe" >
               <input type="hidden" name="token" value="{{ token }}" />
              <input type="text" name="text" placeholder="BackBling ID">
              <input type="submit" name="login" class="btn btn-info" value="Set" />
            </form>

            <form action="/SendPickaxe" method="POST" target="dummyframe" >
              <input type="hidden" name="token" value="{{ token }}" />
             <input type="text" name="text" placeholder="Pickaxe ID">
             <input type="submit" name="login" class="btn btn-info" value="Set" />
            </form>

            <div class="form-group"></div>
                
		</div>
	</div>
</div>

<div class="panel panel-default">
  	<div class="panel-heading"><B>Visual Cosmetics</B></div>
		<div class="panel-body">

          <form action="/SendXpBoost" method="POST" target="dummyframe" >
            <input type="hidden" name="token" value="{{ token }}" />
            <input type="text" name="xp" placeholder="999">
            <input type="text" name="bp" placeholder="999">
            <input type="text" name="team" placeholder="999">
            <input type="submit" name="login" class="btn btn-info" value="Set" />
         </form>

        <form action="/SendBanner" method="POST" target="dummyframe" >
          <input type="hidden" name="token" value="{{ token }}" />
          <input type="text" name="level" placeholder="Level (1-100)">
          <input type="text" name="id" placeholder="Banner ID">
          <input type="text" name="color" placeholder="Banner Color">
          <input type="submit" name="login" class="btn btn-info" value="Set" />
        </form>

        <form action="/SendStatus" method="POST" target="dummyframe" >
          <input type="hidden" name="token" value="{{ token }}" />
          <input type="text" name="text" placeholder="Status">
          <input type="submit" name="login" class="btn btn-info" value="Set" />
        </form>


        <div class="form-group"></div>

		</div>
	</div>
</div>

<div class="panel panel-default">
  	<div class="panel-heading"><B>Client / Party Commands</B></div>
		<div class="panel-body">

         <form action="/SendKick" method="POST" target="dummyframe" >
             <input type="hidden" name="token" value="{{ token }}" />
             <input type="text" name="text" placeholder="Player ID">
             <input type="submit" name="login" class="btn btn-info" value="Kick" />
         </form>

        <form action="/SendHost" method="POST" target="dummyframe" >
            <input type="hidden" name="token" value="{{ token }}" />
            <input type="text" name="text" placeholder="Player ID">
            <input type="submit" name="login" class="btn btn-info" value="Give Host" />
        </form>

        <div class="form-group"></div>
                
		</div>
	</div>
</div>

<div class="panel panel-default">
  	<div class="panel-heading"><B>CID Lookup</B></div>
		<div class="panel-body">

         <form action="/SendCID" method="POST" target="dummyframe" >
             <input type="hidden" name="token" value="{{ token }}" />
             <input type="text" name="text" placeholder="CID">
             <input type="submit" name="login" class="btn btn-info" value="Search" />
        </form>

         <div class="form-group"></div>

        <label>If you want to use two worded skins then use "first+second" | Output will be in logs file on discord Intergration!</label>

        <div class="form-group"></div>

        <label>Please contact Aqua Plays#0001 for any help or with any suggestions on what to add..</label>

        <div class="form-group"></div>

                
		</div>
	</div>
</div>

<div class="form-group"></div>


